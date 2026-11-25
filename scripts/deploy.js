import { execSync } from 'child_process';
import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';

// Load .env configuration
dotenv.config();

function httpsRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        rejectUnauthorized: false,
        ...options,
      },
      (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          const raw = Buffer.concat(chunks).toString();
          try {
            resolve({ statusCode: res.statusCode, headers: res.headers, data: JSON.parse(raw) });
          } catch {
            resolve({ statusCode: res.statusCode, headers: res.headers, raw });
          }
        });
      }
    );
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function streamUpload(options, head, filePath, tail) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        rejectUnauthorized: false,
        ...options,
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try {
            resolve({ statusCode: res.statusCode, headers: res.headers, data: JSON.parse(data) });
          } catch {
            resolve({ statusCode: res.statusCode, headers: res.headers, raw: data });
          }
        });
      }
    );
    req.on('error', reject);
    req.write(head);
    const stream = fs.createReadStream(filePath);
    stream.pipe(req, { end: false });
    stream.on('end', () => {
      req.end(tail);
    });
    stream.on('error', reject);
  });
}

async function deploy() {
  console.log('==================================================');
  console.log('🚀 GMI Web - Automated cPanel Deployment          ');
  console.log('==================================================\n');

  // 1. Validasi Konfigurasi
  const host = process.env.FTP_HOST || '103.229.73.58';
  const user = process.env.FTP_USER || 'k6147419';
  const password = process.env.FTP_PASSWORD;
  const rawRemoteDir = process.env.FTP_REMOTE_DIR || '/gmi.groupmitraindonesia.co.id';
  const remoteDir = rawRemoteDir.replace(/^\/+/, '');

  if (!password || password.trim() === '' || password.includes('masukkan_password')) {
    console.log('--------------------------------------------------');
    console.error('❌ PERHATIAN: Password belum diisi di file .env!');
    console.error('👉 Silakan buka file `.env` di folder project ini.');
    console.error('👉 Isi baris `FTP_PASSWORD=` dengan password cPanel Anda.');
    console.log('--------------------------------------------------\n');
    process.exit(1);
  }

  // 2. Build Website
  console.log('📦 1. Menjalankan proses build...');
  try {
    const buildCmd = process.platform === 'win32' ? 'npm.cmd run build' : 'npm run build';
    execSync(buildCmd, { stdio: 'inherit' });
    console.log('   ✅ Build selesai.\n');
  } catch (err) {
    console.error('   ❌ Gagal melakukan build:', err.message);
    process.exit(1);
  }

  // 3. Buat Arsip dist.tar.gz
  console.log('🗜️  2. Mengompres berkas produksi (dist.tar.gz)...');
  try {
    if (fs.existsSync('dist.tar.gz')) fs.unlinkSync('dist.tar.gz');
    execSync('tar -czf dist.tar.gz -C dist .', { stdio: 'inherit' });
    const archiveSizeMB = (fs.statSync('dist.tar.gz').size / (1024 * 1024)).toFixed(2);
    console.log(`   ✅ Arsip siap (${archiveSizeMB} MB).\n`);
  } catch (err) {
    console.error('   ❌ Gagal membuat arsip:', err.message);
    process.exit(1);
  }

  try {
    // 4. Login ke cPanel
    console.log(`🔌 3. Menghubungkan ke cPanel API (${host}:2083)...`);
    const loginBody = Buffer.from(new URLSearchParams({ user, pass: password }).toString());
    const loginRes = await httpsRequest(
      {
        hostname: host,
        port: 2083,
        path: '/login/?login_only=1',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': loginBody.length,
        },
      },
      loginBody
    );

    const token = loginRes.data?.security_token;
    if (!token) {
      throw new Error(`Login cPanel gagal: ${JSON.stringify(loginRes.data || loginRes.raw)}`);
    }

    const rawCookies = loginRes.headers['set-cookie'] || [];
    const cookies = rawCookies.map((c) => c.split(';')[0]).join('; ');
    console.log('   ✅ Autentikasi cPanel berhasil (Token & Sesi aktif).\n');

    // 5. Upload Arsip via Fileman API (Streaming)
    console.log(`🚀 4. Meng-upload dist.tar.gz ke /home/${user}/${remoteDir}...`);
    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
    const head = Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="dir"\r\n\r\n/home/${user}/${remoteDir}\r\n` +
      `--${boundary}\r\nContent-Disposition: form-data; name="overwrite"\r\n\r\n1\r\n` +
      `--${boundary}\r\nContent-Disposition: form-data; name="file-1"; filename="dist.tar.gz"\r\nContent-Type: application/gzip\r\n\r\n`
    );
    const tail = Buffer.from(`\r\n--${boundary}--\r\n`);
    const fileSize = fs.statSync('dist.tar.gz').size;
    const totalLength = head.length + fileSize + tail.length;

    const uploadRes = await streamUpload(
      {
        hostname: host,
        port: 2083,
        path: `${token}/execute/Fileman/upload_files`,
        method: 'POST',
        headers: {
          Cookie: cookies,
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          'Content-Length': totalLength,
        },
      },
      head,
      'dist.tar.gz',
      tail
    );

    if (uploadRes.data?.status !== 1) {
      throw new Error(`Gagal upload file: ${JSON.stringify(uploadRes.data?.errors || uploadRes.data)}`);
    }
    console.log('   ✅ Upload arsip berhasil.\n');

    // 6. Ekstraksi Arsip di Server
    console.log(`📂 5. Mengekstrak berkas produksi di server (${remoteDir})...`);
    const extractTargets = [remoteDir];
    if (remoteDir !== 'public_html') {
      extractTargets.push('public_html');
    }

    for (const target of extractTargets) {
      console.log(`   ⚙️  Mengekstrak ke: ${target}`);
      const extractBody = Buffer.from(
        new URLSearchParams({
          cpanel_jsonapi_module: 'Fileman',
          cpanel_jsonapi_func: 'fileop',
          cpanel_jsonapi_version: '2',
          op: 'extract',
          sourcefiles: `${remoteDir}/dist.tar.gz`,
          destfiles: target,
          doubledecode: '1',
        }).toString()
      );

      const extractRes = await httpsRequest(
        {
          hostname: host,
          port: 2083,
          path: `${token}/json-api/cpanel`,
          method: 'POST',
          headers: {
            Cookie: cookies,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': extractBody.length,
          },
        },
        extractBody
      );

      const extractSuccess = extractRes.data?.cpanelresult?.data?.[0]?.result === 1;
      if (!extractSuccess) {
        console.warn(`   ⚠️  Peringatan saat ekstrak ke ${target}:`, JSON.stringify(extractRes.data || extractRes.raw));
      } else {
        console.log(`   ✅ Ekstraksi ke ${target} selesai.`);
      }
    }
    console.log('');

    // 7. Hapus Arsip Sementara di Server
    console.log('🧹 6. Membersihkan berkas sementara di server & lokal...');
    const deleteBody = Buffer.from(
      new URLSearchParams({
        dir: `/home/${user}/${remoteDir}`,
        'file-1': 'dist.tar.gz',
      }).toString()
    );
    await httpsRequest(
      {
        hostname: host,
        port: 2083,
        path: `${token}/execute/Fileman/delete_files`,
        method: 'POST',
        headers: {
          Cookie: cookies,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': deleteBody.length,
        },
      },
      deleteBody
    );

    if (fs.existsSync('dist.tar.gz')) {
      fs.unlinkSync('dist.tar.gz');
    }
    console.log('   ✅ Pembersihan selesai.\n');

    const targetUrl = remoteDir.includes('gmi.')
      ? 'https://gmi.groupmitraindonesia.co.id'
      : 'https://groupmitraindonesia.co.id';

    console.log('==================================================');
    console.log('✨ Deployment Berhasil! Website Anda sudah online! 🎉');
    console.log(`🌐 Live URL Hosting : ${targetUrl}`);
    console.log(`🌐 Live URL Domain  : https://groupmitraindonesia.co.id`);
    console.log('==================================================\n');
  } catch (err) {
    console.log('\n--------------------------------------------------');
    console.error('❌ Deployment Gagal:', err.message);
    console.log('--------------------------------------------------\n');
    if (fs.existsSync('dist.tar.gz')) {
      fs.unlinkSync('dist.tar.gz');
    }
    process.exit(1);
  }
}

deploy();

import { Client } from 'basic-ftp';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

// Load .env configuration
dotenv.config();

async function deploy() {
  console.log('==================================================');
  console.log('🚀 GMI Web - Automated cPanel Deployment (FTP)  ');
  console.log('==================================================\n');

  // 1. Validasi Konfigurasi
  const host = process.env.FTP_HOST || '103.229.73.58';
  const port = parseInt(process.env.FTP_PORT || '21', 10);
  const user = process.env.FTP_USER || 'k6147419';
  const password = process.env.FTP_PASSWORD;
  const remoteDir = process.env.FTP_REMOTE_DIR || '/public_html';
  const isSecure = process.env.FTP_SECURE === 'true';

  if (!password || password.trim() === '' || password.includes('masukkan_password')) {
    console.log('--------------------------------------------------');
    console.error('❌ PERHATIAN: Password FTP belum diisi di file .env!');
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

  // 3. FTP Upload
  const client = new Client();
  client.ftp.verbose = false;

  // Track upload progress
  let currentFile = '';
  let fileCount = 0;
  client.trackProgress((info) => {
    if (info.name && info.name !== currentFile) {
      currentFile = info.name;
      fileCount++;
      console.log(`   ⬆️  [${fileCount}] Mengunggah: ${info.name}`);
    }
  });

  try {
    console.log(`🔌 2. Menghubungkan ke server hosting (${host}:${port})...`);
    console.log(`   User: ${user}`);
    await client.access({
      host,
      port,
      user,
      password,
      secure: isSecure,
      secureOptions: { rejectUnauthorized: false },
    });
    console.log('   ✅ Terhubung ke FTP hosting.\n');

    console.log(`📂 3. Membuka direktori tujuan: ${remoteDir}`);
    await client.ensureDir(remoteDir);
    console.log('   ✅ Direktori tujuan siap.\n');

    console.log('🚀 4. Meng-upload file dari folder "dist" ke server...');
    await client.uploadFromDir('dist', remoteDir);

    const targetUrl = remoteDir.includes('gmi.')
      ? 'https://gmi.groupmitraindonesia.co.id'
      : 'https://groupmitraindonesia.co.id';

    console.log('\n==================================================');
    console.log('✨ Deployment Berhasil! Website Anda sudah online! 🎉');
    console.log(`🌐 Live URL: ${targetUrl}`);
    console.log('==================================================\n');
  } catch (err) {
    console.log('\n--------------------------------------------------');
    console.error('❌ Deployment Gagal:', err.message);
    if (err.message.includes('530') || err.message.toLowerCase().includes('login authentication failed')) {
      console.error('👉 Kredensial salah: Periksa kembali FTP_USER dan FTP_PASSWORD di file .env.');
    } else if (err.message.includes('ETIMEDOUT') || err.message.includes('ECONNREFUSED')) {
      console.error('👉 Koneksi bermasalah: Periksa koneksi internet atau FTP_HOST.');
    }
    console.log('--------------------------------------------------\n');
    process.exit(1);
  } finally {
    client.close();
  }
}

deploy();

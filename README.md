# PT Grup Mitra Indonesia (GMI) - Website Landing Page

Landing page resmi PT Grup Mitra Indonesia (GMI) yang dibangun berdasarkan referensi desain **`konsepweb.pdf` (Halaman 1)** dengan antarmuka modern, responsif mobile-friendly, dan arsitektur frontend yang dipersiapkan untuk integrasi backend database (Portal Client & Dashboard Admin).

---

## 🚀 Panduan Menjalankan Proyek

### 1. Menjalankan Server Pengembangan (Local Dev)
```bash
npm run dev
```
Akses di browser melalui: `http://localhost:3000/`

### 2. Membangun untuk Produksi (Production Build)
```bash
npm run build
```
File siap saji akan dibuat di folder `dist/` (dapat langsung di-deploy ke Vercel, Netlify, Nginx, Apache, atau cPanel).

### 3. Meninjau Hasil Build (Preview)
```bash
npm run preview
```

---

## 📱 Fitur Responsif & Mobile-Friendly

1. **Floating Glassmorphism Navbar**:
   - Di desktop tampil sebagai floating pill dengan navigasi: Beranda, Tentang Kami, Layanan Kami, Karir, Hubungi kami, serta shortcut ke Portal & Admin.
   - Di mobile (`< 768px`) otomatis bertransisi menjadi accessible **Navigation Drawer** berbasis `<dialog>` top-layer dengan tombol hamburger dan swipe/click-outside dismiss.
2. **Hero Section**:
   - Foto kemitraan profesional beresolusi tinggi dengan gradient overlay khas GMI (Navy Blue `#061e43`).
   - Tipografi fluid (*Plus Jakarta Sans*) yang nyaman dibaca di smartphone maupun layar 4K.
3. **Statistik Kinerja (Key Metrics)**:
   - `5.000+` Personel Dikelola
   - `100+` Lokasi Operasional
   - `50+` Mitra Perusahaan
   - Dilengkapi animasi *count-up* halus berbasis `IntersectionObserver`.
4. **4 Kartu Layanan (Layanan Kami)**:
   - *Manpower Outsourcing*
   - *Security Services*
   - *Corporate Investigation*
   - *Litigation Support*
   - Dilengkapi dialog detail interaktif saat tombol **"Cari Tahu Lebih Lanjut"** diklik.
5. **Sertifikasi & Asosiasi**:
   - Tab switcher interaktif antara **Sertifikasi** (ISO 45001:2018, ISO 9001:2015, CCPS, CATS, CCI) dan **Asosiasi** (ABUJAPI, APINDO, APSI, KADIN).
6. **Klien Kami**:
   - Tampilan grid elegan di desktop dan touch marquee slider tanpa putus di perangkat mobile, menampilkan 13 logo mitra asli dari konsep PDF: *ABM, Argo Pantes, Alam Lestari Indonesia, Bottega Artisan, Bumimulia, PT Bahana Mega Prestasi, CS Cakra Steel, Indosat Ooredoo, Izzara, Jakpro, KTM, Kuehne+Nagel, MRT Jakarta*.
7. **Banner Konsultasi & Formulir Lead**:
   - Tombol **"Konsultasi Kebutuhan"** & **"Hubungi kami"** membuka modal form terstruktur lengkap dengan validasi dan konfirmasi sukses.
8. **Footer Lengkap**:
   - Alamat lengkap Ruko Thematic Gading Serpong, nomor telepon & WhatsApp (021 29000191 / 0811140059), domain resmi, dan tautan portal.

---

## 🗄️ Kesiapan Integrasi Backend (Portal Client & Dashboard Admin)

Sesuai arahan, landing page ini telah dilengkapi modal gateway **Portal & Admin** yang memetakan kebutuhan sistem backend database:

### A. Portal Client (Akses Mitra)
- **Tujuan**: Memungkinkan mitra bisnis memantau operasional lapangan secara real-time.
- **Modul Siap Hubung**:
  1. Presensi & absensi personel harian di setiap lokasi operasional.
  2. Laporan patroli keamanan (*Guard Tour QR/NFC*).
  3. Akses dokumen invoice & tagihan (*E-Invoicing*).
  4. Pengajuan tiket bantuan (*Ticketing & Service Request*).

### B. Dashboard Admin (Pusat Kendali Operasional)
- **Tujuan**: Pengelolaan master data internal perusahaan.
- **Modul Siap Hubung**:
  1. Manajemen database 5.000+ tenaga kerja (biodata, sertifikasi, masa berlaku KTA Satpam).
  2. Pengaturan shift, ploting lokasi di 100+ site operasional.
  3. CRM prospek lead dari formulir landing page ini.
  4. Manajemen kontrak kerja sama mitra & rekonsiliasi payroll/BPJS.

---

## 📁 Struktur Berkas Proyek

```
gmiweb/
├── public/
│   └── assets/
│       └── images/
│           ├── hero/           # Foto handshake hero
│           ├── services/       # 4 foto layanan operasional
│           ├── certifications/ # 5 logo sertifikasi resmi (ISO, CCPS, CATS, CCI)
│           ├── clients/        # 13 logo klien resmi
│           ├── cta/            # Foto skyline sunset CTA
│           └── logo/           # Logo vektor & high-res GMI
├── src/
│   ├── style.css               # Styling Tailwind CSS v4 & custom animations
│   └── main.js                 # Logika interaktif: drawer, counter, tabs, modals
├── index.html                  # Halaman landing page utama (Halaman 1 Konsep Web)
├── vite.config.js              # Konfigurasi build Vite
├── package.json                # Dependensi & script eksekusi
└── README.md                   # Dokumentasi proyek
```

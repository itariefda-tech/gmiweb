const fs = require('fs');

const mapSection = fs.readFileSync('scripts/indonesia_map_section.html', 'utf8');

const blogHtmlContent = `<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog &amp; Wawasan Industri - PT Group Mitra Indonesia (GMI)</title>
  <meta name="description" content="Kumpulan artikel, edukasi, tren pengamanan, investigasi korporasi, alih daya tenaga kerja, dan manajemen fasilitas dari PT Group Mitra Indonesia.">
  
  <!-- Preconnect & Fonts -->
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
  <link rel="dns-prefetch" href="https://fonts.gstatic.com">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="/src/style.css">
  <link rel="icon" type="image/png" href="/assets/images/logo/gmi-logo.png">
</head>
<body class="bg-slate-50 text-slate-900 antialiased selection:bg-red-600 selection:text-white">

  <!-- ============================================================== -->
  <!-- 1. FLOATING NAVIGATION BAR (Desktop & Mobile)                  -->
  <!-- ============================================================== -->
  <header class="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 transition-all duration-300">
    <div class="max-w-6xl mx-auto">
      <nav class="nav-pill bg-white rounded-full py-4 sm:py-5 px-5 sm:px-8 min-h-[74px] sm:min-h-[82px] flex items-center justify-between border border-slate-100 shadow-xl shadow-slate-900/8" aria-label="Navigasi Utama">
        
        <!-- Logo -->
        <a href="index.html" class="flex items-center gap-2 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded-lg relative left-[5px]">
          <picture>
            <source srcset="/assets/images/logo/Logo-GMI01.webp" type="image/webp">
            <img src="/assets/images/logo/Logo-GMI01.png" alt="Grup Mitra Indonesia Logo" class="h-11 sm:h-[53px] w-auto object-contain transition-transform group-hover:scale-105" width="176" height="53" loading="eager">
          </picture>
        </a>

        <!-- Desktop Navigation Links -->
        <div class="hidden md:flex items-center gap-7 lg:gap-9 text-[15px] sm:text-base font-semibold text-slate-700">
          <a href="index.html" class="nav-link-cool text-slate-700 font-semibold">Beranda</a>
          <a href="tentang-kami.html" class="nav-link-cool text-slate-700 font-semibold">Tentang Kami</a>
          
          <!-- Dropdown Layanan Kami -->
          <div class="relative group py-1">
            <button type="button" class="nav-link-cool text-slate-700 font-semibold flex items-center gap-1.5 focus:outline-none cursor-pointer" aria-expanded="false" aria-haspopup="true">
              <span>Layanan Kami</span>
              <svg class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- Dropdown Card -->
            <div class="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto transition-all duration-200 z-50">
              <div class="w-64 bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 p-2 overflow-hidden ring-1 ring-slate-900/5">
                <a href="layanan-kami.html" class="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#c52227] hover:bg-slate-50 transition-colors">
                  Manpower Outsourcing
                </a>
                <div class="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-0.5"></div>
                <a href="layanan-keamanan.html" class="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#c52227] hover:bg-slate-50 transition-colors">
                  Security Services
                </a>
                <div class="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-0.5"></div>
                <a href="investigasi.html" class="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#c52227] hover:bg-slate-50 transition-colors">
                  Corporate Investigation
                </a>
                <div class="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-0.5"></div>
                <a href="audit-pemulihan-piutang.html" class="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#c52227] hover:bg-slate-50 transition-colors">
                  Litigation Support
                </a>
              </div>
            </div>
          </div>

          <!-- Dropdown Karir -->
          <div class="relative group py-1">
            <button type="button" class="nav-link-cool text-slate-700 font-semibold flex items-center gap-1.5 focus:outline-none cursor-pointer" aria-expanded="false" aria-haspopup="true">
              <span>Karir</span>
              <svg class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- Dropdown Card -->
            <div class="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto transition-all duration-200 z-50">
              <div class="w-56 bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 p-2 overflow-hidden ring-1 ring-slate-900/5">
                <a href="karir.html" class="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#c52227] hover:bg-slate-50 transition-colors">
                  Portal Pelamar
                </a>
                <a href="#" class="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-between" title="Portal Pelatihan (Segera Hadir)">
                  <span>Portal Pelatihan</span>
                  <span class="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">Demo</span>
                </a>
              </div>
            </div>
          </div>

          <a href="blog.html" class="nav-link-cool text-[#061e43] font-bold" aria-current="page">Blog</a>
        </div>

        <!-- Desktop Action Button -->
        <div class="hidden md:flex items-center gap-3 relative right-[3px]">
          <a href="contact-us.html" class="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-bold text-white bg-[#c52227] hover:bg-[#a7181d] shadow-md shadow-red-700/20 transition-all duration-200 btn-wiggle-hover btn-shimmer-subtle cursor-pointer">
            <span>Kontak Kami</span>
          </a>
        </div>

        <!-- Mobile Menu Hamburger Button -->
        <div class="flex md:hidden items-center">
          <button type="button" id="drawer-open-btn" class="p-2.5 rounded-full text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-red-600" aria-label="Buka Menu" aria-expanded="false" aria-controls="mobile-drawer">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

      </nav>
    </div>
  </header>

  <!-- Mobile Drawer Menu (Accessible Native Modal Dialog) -->
  <dialog id="mobile-drawer" class="mobile-drawer fixed inset-0 m-0 w-full h-full max-w-full max-h-full bg-transparent p-0 z-[60] backdrop:bg-slate-900/60 backdrop:backdrop-blur-xs">
    <div class="w-4/5 max-w-sm h-full bg-white shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
      <div>
        <div class="flex items-center justify-between pb-5 border-b border-slate-100">
          <img src="/assets/images/logo/Logo-GMI01.png" alt="GMI Logo" class="h-9 w-auto object-contain">
          <button type="button" id="drawer-close-btn" class="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100" aria-label="Tutup Menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav class="flex flex-col gap-1.5 py-4 text-base font-semibold text-slate-800" aria-label="Navigasi Mobile">
          <a href="index.html" class="drawer-nav-link px-3 py-2.5 rounded-lg hover:bg-slate-50 hover:text-red-600 text-slate-700">Beranda</a>
          <a href="tentang-kami.html" class="drawer-nav-link px-3 py-2.5 rounded-lg hover:bg-slate-50 hover:text-red-600 text-slate-700">Tentang Kami</a>
          
          <!-- Layanan Kami Mobile Group -->
          <div class="py-1 px-1">
            <span class="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Layanan Kami</span>
            <div class="space-y-0.5 pl-1">
              <a href="layanan-kami.html" class="drawer-nav-link block px-2.5 py-2 rounded-lg hover:bg-slate-50 hover:text-red-600 text-slate-700 text-sm font-medium">
                Manpower Outsourcing
              </a>
              <a href="layanan-keamanan.html" class="drawer-nav-link block px-2.5 py-2 rounded-lg hover:bg-slate-50 hover:text-red-600 text-slate-700 text-sm font-medium">
                Security Services
              </a>
              <a href="investigasi.html" class="drawer-nav-link block px-2.5 py-2 rounded-lg hover:bg-slate-50 hover:text-red-600 text-slate-700 text-sm font-medium">
                Corporate Investigation
              </a>
              <a href="audit-pemulihan-piutang.html" class="drawer-nav-link block px-2.5 py-2 rounded-lg hover:bg-slate-50 hover:text-red-600 text-slate-700 text-sm font-medium">
                Litigation Support
              </a>
            </div>
          </div>

          <!-- Karir Mobile Group -->
          <div class="py-1 px-1">
            <span class="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Karir</span>
            <div class="space-y-0.5 pl-1">
              <a href="karir.html" class="drawer-nav-link block px-2.5 py-2 rounded-lg hover:bg-slate-50 hover:text-red-600 text-slate-700 text-sm font-medium">
                Portal Pelamar
              </a>
              <a href="#" class="drawer-nav-link block px-2.5 py-2 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 text-sm font-medium flex items-center justify-between" title="Portal Pelatihan (Segera Hadir)">
                <span>Portal Pelatihan</span>
                <span class="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">Demo</span>
              </a>
            </div>
          </div>

          <a href="blog.html" class="drawer-nav-link px-3 py-2.5 rounded-lg bg-red-50 text-[#c52227] font-bold" aria-current="page">Blog</a>
        </nav>
      </div>

      <div class="pt-6 border-t border-slate-100">
        <a href="contact-us.html" class="flex items-center justify-center w-full px-5 py-3 rounded-xl font-bold text-white bg-[#c52227] hover:bg-[#a7181d] shadow-md transition-colors">
          Kontak Kami
        </a>
      </div>
    </div>
  </dialog>

  <!-- MAIN CONTENT -->
  <main class="pt-32 sm:pt-36">

    <!-- ============================================================== -->
    <!-- 2. HERO BLOG HEADER                                            -->
    <!-- ============================================================== -->
    <section class="relative bg-gradient-to-b from-slate-100 via-white to-slate-50 py-12 sm:py-16 border-b border-slate-200/80">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Breadcrumbs -->
        <nav class="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-4" aria-label="Breadcrumb">
          <a href="index.html" class="hover:text-red-600 transition-colors">Beranda</a>
          <span class="text-slate-400">/</span>
          <span class="text-slate-800 font-medium">Blog</span>
        </nav>

        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div class="max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
              <span class="w-2 h-2 rounded-full bg-red-600"></span>
              Wawasan &amp; Edukasi Industri
            </div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-[#061e43] tracking-tight">
              Blog &amp; Berita Terkini
            </h1>
            <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              Pelajari wawasan mendalam seputar sistem pengamanan korporasi, alih daya tenaga kerja profesional, audit investigasi kepatuhan, serta manajemen fasilitas modern dari pakar PT Group Mitra Indonesia.
            </p>
          </div>

          <!-- Live Search Bar -->
          <div class="w-full md:w-80">
            <div class="relative">
              <input type="text" id="blog-search-input" placeholder="Cari artikel / topik..." class="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 shadow-sm transition-all" aria-label="Cari artikel blog">
              <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <button type="button" id="blog-search-clear" class="hidden absolute right-3 top-3 text-slate-400 hover:text-slate-600 p-0.5 rounded-full" aria-label="Hapus Pencarian">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Category Filter Tabs -->
        <div class="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-slate-200" id="blog-categories">
          <button type="button" data-category="all" class="blog-filter-btn px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-[#c52227] text-white shadow-md transition-all cursor-pointer">
            Semua Artikel (6)
          </button>
          <button type="button" data-category="investigasi" class="blog-filter-btn px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer">
            Investigasi &amp; Audit
          </button>
          <button type="button" data-category="cleaning" class="blog-filter-btn px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer">
            Cleaning &amp; Facility
          </button>
          <button type="button" data-category="security" class="blog-filter-btn px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer">
            Security Services
          </button>
          <button type="button" data-category="manpower" class="blog-filter-btn px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer">
            Manpower Outsourcing
          </button>
          <button type="button" data-category="piutang" class="blog-filter-btn px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer">
            Pemulihan Piutang
          </button>
        </div>

      </div>
    </section>

    <!-- ============================================================== -->
    <!-- 3. FEATURED ARTICLE (HERO CARD)                                -->
    <!-- ============================================================== -->
    <section class="py-10 bg-slate-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="blog-article-card bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl shadow-slate-900/5 hover:shadow-2xl transition-all duration-300 group grid grid-cols-1 lg:grid-cols-12 gap-0" data-category="investigasi" data-tags="investigasi audit fraud due diligence corporate risk compliance">
          
          <div class="lg:col-span-7 relative overflow-hidden min-h-[280px] sm:min-h-[360px] bg-slate-900">
            <img src="/assets/images/services/investigation-audit.webp" alt="Corporate Investigation Services" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="eager">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent"></div>
            
            <div class="absolute top-4 left-4 flex items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold text-white bg-red-600 shadow-md">
                FEATURED ARTIKEL
              </span>
              <span class="px-3 py-1 rounded-full text-xs font-bold text-slate-900 bg-white/90 backdrop-blur-xs shadow-md">
                Investigasi &amp; Audit
              </span>
            </div>

            <div class="absolute bottom-4 left-4 right-4 text-white text-xs flex items-center justify-between">
              <span class="flex items-center gap-1.5 font-medium">
                <svg class="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                5 Menit Baca
              </span>
              <span>03 November 2023</span>
            </div>
          </div>

          <div class="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <span class="font-semibold text-red-600">Admin Redaksi GMI</span>
                <span>•</span>
                <span>Wawasan Manajemen Risiko</span>
              </div>
              <h2 class="article-title text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#061e43] leading-snug group-hover:text-red-600 transition-colors">
                Corporate Investigation Services: Strategi Perlindungan Aset &amp; Integritas Bisnis
              </h2>
              <p class="article-excerpt mt-3 text-sm text-slate-600 leading-relaxed">
                Corporate investigation atau investigasi perusahaan merujuk pada proses pengumpulan fakta, peninjauan dokumen, dan analisis forensik menyeluruh untuk mendeteksi potensi kecurangan, pelanggaran etika kerja, hingga mitigasi risiko reputasi sebelum kerugian finansial meluas.
              </p>
            </div>

            <div class="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
              <button type="button" data-open-article="article-full-1" class="inline-flex items-center gap-2 text-sm font-bold text-[#c52227] hover:text-[#a7181d] cursor-pointer group-hover:translate-x-1 transition-all">
                <span>Baca Artikel Lengkap</span>
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </button>
              <span class="text-xs text-slate-400">Kasus &amp; Best Practice</span>
            </div>

          </div>

        </div>

      </div>
    </section>

    <!-- ============================================================== -->
    <!-- 4. BLOG POSTS GRID (5 ARTICLES + MODAL TRIGGERS)               -->
    <!-- ============================================================== -->
    <section class="py-12 bg-white border-t border-slate-100">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex items-center justify-between mb-8">
          <div>
            <h3 class="text-xl sm:text-2xl font-black text-[#061e43]">Artikel Terbaru &amp; Populer</h3>
            <p class="text-xs sm:text-sm text-slate-500 mt-1">Panduan praktis untuk optimalisasi operasional perusahaan Anda</p>
          </div>
        </div>

        <!-- Grid Container -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id="blog-grid">
          
          <!-- Card 2: Cleaning Service -->
          <article class="blog-article-card bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg shadow-slate-900/4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group" data-category="cleaning" data-tags="jasa cleaning service kebersihan komersial facility management gedung perkantoran pabrik higienitas k3">
            <div>
              <div class="relative h-48 overflow-hidden bg-slate-100">
                <img src="/assets/images/services/env-komersial.webp" alt="Jasa Cleaning Service Profesional" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
                <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold text-white bg-emerald-600 shadow-sm">
                  Cleaning &amp; Facility
                </span>
                <span class="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-900/70 text-white backdrop-blur-xs">
                  4 Menit Baca
                </span>
              </div>
              <div class="p-6">
                <div class="text-[11px] text-slate-400 font-semibold mb-2">01 November 2023 • Higienitas Industri</div>
                <h4 class="article-title text-lg font-bold text-[#061e43] leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                  Jasa Cleaning Service: Standar Kebersihan &amp; Pemeliharaan Fasilitas Gedung Modern
                </h4>
                <p class="article-excerpt mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  Jasa cleaning service profesional dari PT Group Mitra Indonesia menjamin lingkungan kerja yang higienis, sanitasi bersertifikat, dan penggunaan chemical ramah lingkungan demi kenyamanan optimal karyawan dan pengunjung gedung.
                </p>
              </div>
            </div>
            <div class="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
              <span class="text-xs text-slate-500">Tim Fasilitas GMI</span>
              <button type="button" data-open-article="article-full-2" class="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer">
                <span>Selengkapnya</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </article>

          <!-- Card 3: Security Services -->
          <article class="blog-article-card bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg shadow-slate-900/4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group" data-category="security" data-tags="security services pengamanan fisik satpam gada pratama cctv pemantauan pabrik kawasan industri">
            <div>
              <div class="relative h-48 overflow-hidden bg-slate-100">
                <img src="/assets/images/services/security-services.webp" alt="Layanan Keamanan Terpadu" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
                <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold text-white bg-[#061e43] shadow-sm">
                  Security Services
                </span>
                <span class="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-900/70 text-white backdrop-blur-xs">
                  6 Menit Baca
                </span>
              </div>
              <div class="p-6">
                <div class="text-[11px] text-slate-400 font-semibold mb-2">15 Januari 2024 • Proteksi Fisik</div>
                <h4 class="article-title text-lg font-bold text-[#061e43] leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                  Integrasi Pengamanan Fisik &amp; Pemantauan Cerdas di Kawasan Industri
                </h4>
                <p class="article-excerpt mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  Bagaimana sinergi antara satuan pengamanan berlisensi Mabes Polri dengan analitik pengawasan kamera CCTV modern dapat menekan tingkat insiden kehilangan hingga mendekati zero percent di lingkungan pabrik dan pergudangan.
                </p>
              </div>
            </div>
            <div class="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
              <span class="text-xs text-slate-500">Divisi Keamanan GMI</span>
              <button type="button" data-open-article="article-full-3" class="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer">
                <span>Selengkapnya</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </article>

          <!-- Card 4: Debt Recovery -->
          <article class="blog-article-card bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg shadow-slate-900/4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group" data-category="piutang" data-tags="pemulihan piutang debt recovery keuangan b2b audit piutang negosiasi hukum mitigasi macet">
            <div>
              <div class="relative h-48 overflow-hidden bg-slate-100">
                <img src="/assets/images/services/litigation-support.webp" alt="Program Pemulihan Piutang Bisnis" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
                <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold text-white bg-amber-600 shadow-sm">
                  Pemulihan Piutang
                </span>
                <span class="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-900/70 text-white backdrop-blur-xs">
                  5 Menit Baca
                </span>
              </div>
              <div class="p-6">
                <div class="text-[11px] text-slate-400 font-semibold mb-2">22 Februari 2024 • Finansial &amp; Legal</div>
                <h4 class="article-title text-lg font-bold text-[#061e43] leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                  Strategi Pemulihan Piutang B2B Efektif Tanpa Merusak Hubungan Kemitraan
                </h4>
                <p class="article-excerpt mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  Menghadapi keterlambatan pembayaran invoice korporasi memerlukan pendekatan mediasi terstruktur, verifikasi likuiditas mitra, serta kepatuhan hukum yang kuat untuk menjaga reputasi dan arus kas perusahaan.
                </p>
              </div>
            </div>
            <div class="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
              <span class="text-xs text-slate-500">Legal Audit GMI</span>
              <button type="button" data-open-article="article-full-4" class="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer">
                <span>Selengkapnya</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </article>

          <!-- Card 5: Manpower Outsourcing -->
          <article class="blog-article-card bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg shadow-slate-900/4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group" data-category="manpower" data-tags="manpower outsourcing alih daya tenaga kerja sdm rekrutmen efisiensi payroll ketenagakerjaan">
            <div>
              <div class="relative h-48 overflow-hidden bg-slate-100">
                <img src="/assets/images/services/manpower-outsourcing.webp" alt="Manpower Outsourcing Terpadu" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
                <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold text-white bg-blue-600 shadow-sm">
                  Manpower Outsourcing
                </span>
                <span class="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-900/70 text-white backdrop-blur-xs">
                  5 Menit Baca
                </span>
              </div>
              <div class="p-6">
                <div class="text-[11px] text-slate-400 font-semibold mb-2">10 Maret 2024 • Pengelolaan SDM</div>
                <h4 class="article-title text-lg font-bold text-[#061e43] leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                  Panduan Alih Daya Tenaga Kerja: Kepatuhan Regulasi &amp; Fleksibilitas Operasional
                </h4>
                <p class="article-excerpt mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  Bagaimana model alih daya berbasis kompetensi membantu pimpinan perusahaan mengurangi beban administrasi rekrutmen, memangkas biaya pesangon, dan memastikan pemenuhan regulasi ketenagakerjaan terbaru di Indonesia.
                </p>
              </div>
            </div>
            <div class="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
              <span class="text-xs text-slate-500">Human Capital GMI</span>
              <button type="button" data-open-article="article-full-5" class="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer">
                <span>Selengkapnya</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </article>

          <!-- Card 6: K-9 Security -->
          <article class="blog-article-card bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg shadow-slate-900/4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group" data-category="security" data-tags="unit k-9 satwa anjing pelacak obvitnas pengamanan event konser pelabuhan sterilisasi handak narkotika">
            <div>
              <div class="relative h-48 overflow-hidden bg-slate-100">
                <img src="/assets/images/services/pilar-k9.jpg" alt="Unit Satwa K-9 GMI" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
                <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold text-white bg-slate-800 shadow-sm">
                  Security Services
                </span>
                <span class="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-900/70 text-white backdrop-blur-xs">
                  4 Menit Baca
                </span>
              </div>
              <div class="p-6">
                <div class="text-[11px] text-slate-400 font-semibold mb-2">18 April 2024 • Taktis Satwa</div>
                <h4 class="article-title text-lg font-bold text-[#061e43] leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                  Peran Strategis Satwa K-9 dalam Sterilisasi Kawasan Berisiko Tinggi
                </h4>
                <p class="article-excerpt mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  Keberadaan unit K-9 bersertifikasi handler profesional memberikan deterrence psikologis yang ampuh sekaligus kapabilitas deteksi handak, narkotika, dan pelacakan jejak di area pelabuhan, obvitnas, dan event skala internasional.
                </p>
              </div>
            </div>
            <div class="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
              <span class="text-xs text-slate-500">Unit Satwa K-9 GMI</span>
              <button type="button" data-open-article="article-full-6" class="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer">
                <span>Selengkapnya</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </article>

        </div>

        <!-- Empty State (Hidden by default) -->
        <div id="blog-empty-state" class="hidden text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-300 mt-6">
          <svg class="w-12 h-12 text-slate-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h4 class="text-lg font-bold text-slate-800">Tidak ada artikel yang cocok</h4>
          <p class="text-sm text-slate-500 mt-1 max-w-sm mx-auto">Coba gunakan kata kunci lain atau pilih kategori "Semua Artikel" untuk melihat seluruh wawasan kami.</p>
        </div>

      </div>
    </section>

${mapSection}

    <!-- ============================================================== -->
    <!-- 6. SECTION VIDEO SHOWCASE (PERSIS DIATAS FOOTER - AUTOPLAY)    -->
    <!-- ============================================================== -->
    <section id="video-profil-gmi" class="py-16 sm:py-24 bg-[#041634] text-white relative overflow-hidden border-t border-slate-800">
      
      <!-- Ambient Lighting Effect -->
      <div class="absolute -top-40 -left-40 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Video Header -->
        <div class="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm font-semibold mb-4">
            <svg class="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            VIDEO DOKUMENTASI &amp; PROFIL RESMI
          </div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            PT Group Mitra Indonesia: Solusi Industri Terpercaya
          </h2>
          <p class="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Saksikan dedikasi, standar profesionalisme, serta kesiapan operasional tim PT Group Mitra Indonesia dalam mengamankan dan mendukung kelancaran ekosistem bisnis klien di berbagai sektor strategis.
          </p>
        </div>

        <!-- Video Player Frame with Autoplay -->
        <div class="max-w-4xl mx-auto">
          <div class="relative bg-slate-900 rounded-3xl p-2 sm:p-3.5 shadow-2xl shadow-black/60 border border-white/10 ring-1 ring-white/5">
            
            <div class="relative w-full overflow-hidden rounded-2xl aspect-video bg-black shadow-inner">
              <!-- Autoplay YouTube Video according to user specifications -->
              <iframe 
                src="https://www.youtube.com/embed/fngtQyl7GrY?autoplay=1&mute=1&loop=1&playlist=fngtQyl7GrY&rel=0&modestbranding=1" 
                title="PT Group Mitra Indonesia - Official Video" 
                class="absolute inset-0 w-full h-full border-0 rounded-2xl" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen
                loading="lazy">
              </iframe>
            </div>

            <!-- Video Player Caption & Badges -->
            <div class="mt-4 px-3 py-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 border-t border-white/10">
              <div class="flex items-center gap-3">
                <span class="inline-flex items-center gap-1.5 text-white font-semibold">
                  <span class="w-2 h-2 rounded-full bg-red-500 animate-ping"></span> Autoplay Aktif
                </span>
                <span>•</span>
                <span>Resolusi Full HD 1080p</span>
              </div>
              <div class="flex items-center gap-2">
                <span>Ingin konsultasi layanan?</span>
                <a href="contact-us.html" class="text-red-400 hover:text-red-300 font-bold hover:underline transition-colors">Hubungi Kami &rarr;</a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>

  </main>

  <!-- ============================================================== -->
  <!-- 7. FOOTER (Deep Navy Theme)                                    -->
  <!-- ============================================================== -->
  <footer class="bg-[#041634] text-white border-t border-white/10">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8 sm:pb-10">
      
      <!-- Footer Main Grid (4 Columns) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-white/10">
        
        <!-- Col 1: Brand & Bio -->
        <div class="lg:col-span-1">
          <a href="index.html" class="inline-block mb-4">
            <img src="/assets/images/logo/Logo-GMI01.png" alt="PT Group Mitra Indonesia" class="h-10 w-auto object-contain brightness-0 invert">
          </a>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Mitra strategis terpercaya penyedia layanan pengamanan fisik, alih daya tenaga kerja, penyelidikan korporasi, dan pemulihan piutang untuk mendukung produktivitas perusahaan Anda.
          </p>
        </div>

        <!-- Col 2: Layanan Kami -->
        <div>
          <h4 class="text-sm font-semibold tracking-wide text-white mb-3">Layanan Kami</h4>
          <ul class="flex flex-col gap-2 text-xs sm:text-sm text-slate-300">
            <li><a href="layanan-kami.html" class="hover:text-white transition-colors">Manpower Outsourcing</a></li>
            <li><a href="layanan-keamanan.html" class="hover:text-white transition-colors">Security Services &amp; K-9</a></li>
            <li><a href="investigasi.html" class="hover:text-white transition-colors">Corporate Investigation</a></li>
            <li><a href="audit-pemulihan-piutang.html" class="hover:text-white transition-colors">Program Pemulihan Piutang</a></li>
            <li><a href="portal-klien.html" class="hover:text-white transition-colors">Portal Manajemen Klien</a></li>
          </ul>
        </div>

        <!-- Col 3: Media Sosial & Navigasi -->
        <div>
          <h4 class="text-sm font-semibold tracking-wide text-white mb-3">Tautan &amp; Media</h4>
          <ul class="flex flex-col gap-2 text-xs sm:text-sm text-slate-300">
            <li><a href="tentang-kami.html" class="hover:text-white transition-colors">Tentang Kami</a></li>
            <li><a href="galeri.html" class="hover:text-white transition-colors">Galeri Dokumentasi</a></li>
            <li><a href="klien.html" class="hover:text-white transition-colors">Portofolio Klien</a></li>
            <li><a href="blog.html" class="text-red-400 font-semibold hover:text-white transition-colors">Blog &amp; Berita</a></li>
            <li><a href="karir.html" class="hover:text-white transition-colors">Karir &amp; Rekrutmen</a></li>
          </ul>
          
          <div class="mt-4 pt-3 border-t border-white/10">
            <span class="text-xs text-slate-400 block mb-2 font-medium">Ikuti Kami:</span>
            <div class="flex items-center gap-3">
              <a href="https://www.linkedin.com/company/pt-group-mitra-indonesia-gmi/" target="_blank" rel="noopener noreferrer" class="p-2 rounded-full bg-white/10 hover:bg-red-600 text-white transition-colors" aria-label="LinkedIn">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://www.instagram.com/groupmitraindonesia/" target="_blank" rel="noopener noreferrer" class="p-2 rounded-full bg-white/10 hover:bg-red-600 text-white transition-colors" aria-label="Instagram">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61553487144217" target="_blank" rel="noopener noreferrer" class="p-2 rounded-full bg-white/10 hover:bg-red-600 text-white transition-colors" aria-label="Facebook">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Col 4: Kontak Kami -->
        <div>
          <h4 class="text-sm font-semibold tracking-wide text-white mb-3">Kontak Kami</h4>
          <ul class="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-300">
            <li class="flex items-start gap-2.5">
              <svg class="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <a href="tel:+62811140059" class="hover:text-white transition-colors">(021) 29000191 / 0811 140 059</a>
            </li>
            <li class="flex items-start gap-2.5">
              <svg class="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <a href="mailto:info@groupmitraindonesia.co.id" class="hover:underline hover:text-white transition-colors">info@groupmitraindonesia.co.id</a>
            </li>
            <li class="flex items-start gap-2.5">
              <svg class="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              <a href="https://groupmitraindonesia.co.id" class="hover:underline hover:text-white transition-colors">groupmitraindonesia.co.id</a>
            </li>
            <li class="flex items-start gap-2.5">
              <svg class="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span class="leading-relaxed">
                Ruko Thematic Blok N No. 51, Gading Serpong, Kelapa Dua, Tangerang, Banten 15810
              </span>
            </li>
          </ul>
        </div>

      </div>

      <!-- Footer Bottom Copyright -->
      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
        <p>&copy; 2026 PT Grup Mitra Indonesia. Seluruh hak cipta dilindungi.</p>
        <div class="flex items-center gap-5 sm:gap-6">
          <a href="index.html" class="hover:text-white transition-colors">Beranda</a>
          <a href="tentang-kami.html" class="hover:text-white transition-colors">Tentang Kami</a>
          <a href="karir.html" class="hover:text-white transition-colors">Karir</a>
          <a href="portal-klien.html" class="hover:text-white transition-colors">Portal Klien</a>
          <a href="contact-us.html" class="text-white font-medium hover:underline transition-colors">Hubungi Kami</a>
        </div>
      </div>

    </div>
  </footer>

  <!-- ============================================================== -->
  <!-- 8. ARTICLE READER MODAL (Accessible Native Dialog)             -->
  <!-- ============================================================== -->
  <dialog id="blog-article-modal" class="fixed inset-0 m-auto w-full max-w-3xl max-h-[90vh] bg-transparent p-4 z-[70] backdrop:bg-slate-950/75 backdrop:backdrop-blur-sm">
    <div class="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-slate-100">
      
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
        <div class="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider">
          <span class="w-2 h-2 rounded-full bg-red-600"></span>
          Artikel Lengkap
        </div>
        <button type="button" id="modal-close-btn" class="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors" aria-label="Tutup Dialog">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Modal Body (Injected dynamically) -->
      <div id="modal-article-body" class="p-6 sm:p-8 overflow-y-auto space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
        <!-- Content will be populated from template stores below -->
      </div>

      <!-- Modal Footer -->
      <div class="p-4 px-6 border-t border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span class="text-slate-500">PT Group Mitra Indonesia &bull; Industrial Services</span>
        <a href="contact-us.html" class="px-4 py-2 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 transition-colors">
          Konsultasi Kebutuhan Ini
        </a>
      </div>

    </div>
  </dialog>

  <!-- ============================================================== -->
  <!-- HIDDEN TEMPLATES FOR FULL ARTICLE READING MODAL               -->
  <!-- ============================================================== -->
  <div class="hidden" aria-hidden="true">
    
    <!-- Full Article 1 -->
    <div id="article-full-1">
      <div class="mb-4">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-bold text-red-600 bg-red-50 mb-2">Investigasi &amp; Audit</span>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-[#061e43] leading-tight">
          Corporate Investigation Services: Strategi Perlindungan Aset &amp; Integritas Bisnis Modern
        </h2>
        <div class="text-xs text-slate-500 mt-2">Diterbitkan oleh Tim Investigasi GMI &bull; 03 November 2023 &bull; 5 Menit Baca</div>
      </div>
      <img src="/assets/images/services/investigation-audit.webp" alt="Corporate Investigation" class="w-full h-64 object-cover rounded-2xl mb-6 shadow-sm">
      <p class="font-medium text-slate-800 text-base">
        Corporate investigation atau investigasi perusahaan merupakan rangkaian proses sistematis dalam mengumpulkan, meninjau, dan menganalisis fakta-fakta internal maupun eksternal guna mendeteksi serta membuktikan adanya pelanggaran kepatuhan, fraud (kecurangan), atau konflik kepentingan.
      </p>
      <h3 class="text-lg font-bold text-[#061e43] mt-5">Mengapa Investigasi Korporasi Krusial?</h3>
      <p>
        Di tengah lanskap bisnis yang semakin dinamis dan terhubung secara digital, ancaman terhadap aset perusahaan tidak hanya datang dari pencurian fisik, melainkan penyalahgunaan wewenang internal, penggelapan data rahasia, kickback dalam proses pengadaan (procurement), hingga pemalsuan laporan keuangan.
      </p>
      <div class="p-4 rounded-2xl bg-slate-50 border-l-4 border-red-600 my-4 text-sm text-slate-700">
        <strong>Fakta Lapangan:</strong> Menurut survei fraud korporasi internasional, lebih dari 40% kerugian finansial perusahaan bermula dari celah pengawasan internal yang terlambat diidentifikasi.
      </div>
      <h3 class="text-lg font-bold text-[#061e43] mt-5">Ruang Lingkup Layanan Investigasi PT Group Mitra Indonesia:</h3>
      <ul class="list-disc pl-5 space-y-2 mt-2 text-sm sm:text-base">
        <li><strong>Background Check &amp; Due Diligence:</strong> Pemeriksaan rekam jejak mendalam terhadap calon eksekutif, mitra konsorsium, dan vendor kunci.</li>
        <li><strong>Audit Investigasi Fraud &amp; Forensic Review:</strong> Penelusuran aliran dana dan jejak dokumen transaksi yang mencurigakan.</li>
        <li><strong>Undercover &amp; Asset Tracing:</strong> Pelacakan aset perusahaan yang dipindahtangankan secara tidak sah.</li>
        <li><strong>Litigation Support:</strong> Penyusunan laporan temuan investigasi yang runtut dan berbobot hukum untuk kepentingan persidangan atau mediasi.</li>
      </ul>
      <p class="mt-4">
        Dengan metodologi yang objektif, kerahasiaan tingkat tinggi, dan personel berpengalaman mantan penyidik kepolisian serta auditor bersertifikasi, GMI membantu korporasi memitigasi risiko secara tuntas tanpa mengganggu stabilitas operasional harian.
      </p>
    </div>

    <!-- Full Article 2 -->
    <div id="article-full-2">
      <div class="mb-4">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-bold text-emerald-600 bg-emerald-50 mb-2">Cleaning &amp; Facility</span>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-[#061e43] leading-tight">
          Optimalisasi Produktivitas Kerja Melalui Jasa Commercial Cleaning &amp; Facility Management
        </h2>
        <div class="text-xs text-slate-500 mt-2">Diterbitkan oleh Divisi Fasilitas GMI &bull; 01 November 2023 &bull; 4 Menit Baca</div>
      </div>
      <img src="/assets/images/services/env-komersial.webp" alt="Cleaning Service" class="w-full h-64 object-cover rounded-2xl mb-6 shadow-sm">
      <p class="font-medium text-slate-800 text-base">
        Jasa cleaning service komersial bukan sekadar aktivitas menyapu atau mengepel lantai, melainkan penerapan standar higiene terpadu yang berdampak langsung pada kesehatan, citra perusahaan, dan masa pakai aset fisik gedung.
      </p>
      <h3 class="text-lg font-bold text-[#061e43] mt-5">Standar Pemeliharaan Fasilitas Modern</h3>
      <p>
        Bagi gedung perkantoran bertingkat tinggi, rumah sakit, pusat perbelanjaan, dan pabrik pengolahan, higienitas merupakan pilar esensial pemenuhan sertifikasi K3 (Keselamatan dan Kesehatan Kerja). Penerapan SOP berkala menjamin seluruh area publik, toilet, ruang kerja, dan fasilitas produksi bebas dari kontaminasi bakteri serta debu mikroskopis.
      </p>
      <h3 class="text-lg font-bold text-[#061e43] mt-5">Keunggulan Layanan Cleaning PT Group Mitra Indonesia:</h3>
      <ul class="list-disc pl-5 space-y-2 mt-2 text-sm sm:text-base">
        <li><strong>Chemical Ramah Lingkungan (Eco-Friendly):</strong> Aman untuk manusia dan tidak merusak material lantai marmer, granit, maupun karpet.</li>
        <li><strong>Peralatan Modern &amp; Mekanikal:</strong> Penggunaan ride-on scrubber, polisher kecepatan tinggi, dan hydro-vacuum extraction.</li>
        <li><strong>Pembersihan Kaca Ketinggian (Gondola/Rope Access):</strong> Tenaga kerja terlatih dengan sertifikasi Kemenaker untuk fasad gedung tinggi.</li>
        <li><strong>Supervisi Mutu Berkala:</strong> Inspeksi harian oleh Quality Control officer memastikan hasil kerja konsisten dan prima.</li>
      </ul>
    </div>

    <!-- Full Article 3 -->
    <div id="article-full-3">
      <div class="mb-4">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-bold text-blue-600 bg-blue-50 mb-2">Security Services</span>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-[#061e43] leading-tight">
          Integrasi Pengamanan Fisik &amp; Pemantauan Cerdas di Kawasan Industri
        </h2>
        <div class="text-xs text-slate-500 mt-2">Diterbitkan oleh Divisi Keamanan GMI &bull; 15 Januari 2024 &bull; 6 Menit Baca</div>
      </div>
      <img src="/assets/images/services/security-services.webp" alt="Security Services" class="w-full h-64 object-cover rounded-2xl mb-6 shadow-sm">
      <p class="font-medium text-slate-800 text-base">
        Keamanan kawasan industri menuntut ketelitian tinggi karena menyangkut jutaan dolar aset mesin, bahan baku, keselamatan ribuan buruh pabrik, serta kepatuhan rantai pasok global.
      </p>
      <h3 class="text-lg font-bold text-[#061e43] mt-5">Pendekatan Multi-Layer Security GMI</h3>
      <p>
        PT Group Mitra Indonesia menerapkan pola proteksi berlapis yang menggabungkan Satuan Pengamanan (Satpam) kualifikasi Gada Pratama/Madya dengan teknologi pemantauan terpusat (Central Monitoring Station), sistem akses kontrol biometrik gerbang masuk, dan patroli berkala menggunakan sistem barcode check-point.
      </p>
    </div>

    <!-- Full Article 4 -->
    <div id="article-full-4">
      <div class="mb-4">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-bold text-amber-600 bg-amber-50 mb-2">Pemulihan Piutang</span>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-[#061e43] leading-tight">
          Strategi Pemulihan Piutang B2B Efektif Tanpa Merusak Hubungan Kemitraan
        </h2>
        <div class="text-xs text-slate-500 mt-2">Diterbitkan oleh Legal Audit GMI &bull; 22 Februari 2024 &bull; 5 Menit Baca</div>
      </div>
      <img src="/assets/images/services/litigation-support.webp" alt="Pemulihan Piutang" class="w-full h-64 object-cover rounded-2xl mb-6 shadow-sm">
      <p class="font-medium text-slate-800 text-base">
        Piutang macet merupakan salah satu ancaman likuiditas terbesar bagi korporasi. Namun, penagihan yang serampangan berisiko merusak nama baik perusahaan dan memutus hubungan kerja sama bisnis yang bernilai di masa depan.
      </p>
      <h3 class="text-lg font-bold text-[#061e43] mt-5">Solusi Mediasi &amp; Legal Restrukturisasi GMI</h3>
      <p>
        Melalui pendekatan persuasif, audit posisi keuangan debitur, dan skema restrukturisasi pembayaran yang taat hukum perdata dan komersial, GMI berhasil merecovery miliaran rupiah tagihan macet bagi klien manufaktur, logistik, dan distributor tanpa friksi hukum yang berlarut-larut.
      </p>
    </div>

    <!-- Full Article 5 -->
    <div id="article-full-5">
      <div class="mb-4">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-bold text-blue-600 bg-blue-50 mb-2">Manpower Outsourcing</span>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-[#061e43] leading-tight">
          Panduan Alih Daya Tenaga Kerja: Kepatuhan Regulasi &amp; Fleksibilitas Operasional
        </h2>
        <div class="text-xs text-slate-500 mt-2">Diterbitkan oleh Human Capital GMI &bull; 10 Maret 2024 &bull; 5 Menit Baca</div>
      </div>
      <img src="/assets/images/services/manpower-outsourcing.webp" alt="Manpower Outsourcing" class="w-full h-64 object-cover rounded-2xl mb-6 shadow-sm">
      <p class="font-medium text-slate-800 text-base">
        Dalam menghadapi fluktuasi permintaan pasar, perusahaan modern membutuhkan struktur ketenagakerjaan yang adaptif tanpa terbebani overhead rekrutmen dan kepatuhan administratif BPJS atau perselisihan ketenagakerjaan.
      </p>
      <h3 class="text-lg font-bold text-[#061e43] mt-5">Sistem Outsourcing Komprehensif GMI</h3>
      <p>
        Kami mengelola rekrutmen berbasis uji kompetensi, pelatihan disiplin, administrasi penggajian (payroll), asuransi ketenagakerjaan, hingga penggantian personel siaga (standby replacement) secara transparan dan sesuai regulasi PP Ketenagakerjaan terkini.
      </p>
    </div>

    <!-- Full Article 6 -->
    <div id="article-full-6">
      <div class="mb-4">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-bold text-slate-700 bg-slate-100 mb-2">Security Services</span>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-[#061e43] leading-tight">
          Peran Strategis Satwa K-9 dalam Sterilisasi Kawasan Berisiko Tinggi
        </h2>
        <div class="text-xs text-slate-500 mt-2">Diterbitkan oleh Unit Satwa K-9 GMI &bull; 18 April 2024 &bull; 4 Menit Baca</div>
      </div>
      <img src="/assets/images/services/pilar-k9.jpg" alt="Unit Satwa K-9" class="w-full h-64 object-cover rounded-2xl mb-6 shadow-sm">
      <p class="font-medium text-slate-800 text-base">
        Indera penciuman anjing pelacak memiliki sensitivitas hingga ribuan kali lipat dibandingkan manusia dan peralatan elektronik portabel, menjadikannya instrumen deteksi tercepat untuk pencegahan ancaman keamanan berisiko tinggi.
      </p>
      <h3 class="text-lg font-bold text-[#061e43] mt-5">Keahlian Khusus Unit K-9 PT Group Mitra Indonesia</h3>
      <p>
        Unit K-9 kami dilatih khusus oleh instruktur bersertifikasi internasional untuk deteksi bahan peledak (handak), narkotika, sterilisasi panggung VVIP, patroli perimeter pelabuhan, hingga pengendalian massa (crowd control) pada saat situasi darurat.
      </p>
    </div>

  </div>

  <!-- Application Script -->
  <script type="module" src="/src/main.js"></script>
</body>
</html>
`;

fs.writeFileSync('blog.html', blogHtmlContent, 'utf8');
console.log('Successfully wrote blog.html, size:', blogHtmlContent.length);

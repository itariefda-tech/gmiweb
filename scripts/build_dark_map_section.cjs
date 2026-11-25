const fs = require('fs');

const lightSection = fs.readFileSync('scripts/indonesia_map_section.html', 'utf8');

// 1. Extract Province Paths
const provGroupStart = lightSection.indexOf('<g filter="url(#indonesia-map-shadow)" id="map-provinces-group">');
const provGroupEnd = lightSection.indexOf('</g>', provGroupStart);
if (provGroupStart === -1 || provGroupEnd === -1) {
  console.error('Could not find province group in scripts/indonesia_map_section.html');
  process.exit(1);
}

const rawProvContent = lightSection.substring(provGroupStart + '<g filter="url(#indonesia-map-shadow)" id="map-provinces-group">'.length, provGroupEnd);

const darkColors = [
  '#15233c', '#182b49', '#122036', '#1a2f50', '#162844', 
  '#1c3257', '#14253e', '#192d4e', '#132239', '#1b3052'
];

let provIdx = 0;
const darkProvContent = rawProvContent.split('\n').map(line => {
  if (!line.includes('<path')) return line;
  const color = darkColors[provIdx % darkColors.length];
  provIdx++;
  return line
    .replace(/fill="#[0-9a-fA-F]{6}"/, `fill="${color}"`)
    .replace('stroke="#ffffff"', 'stroke="rgba(255,255,255,0.14)"')
    .replace('stroke-width="0.8"', 'stroke-width="0.75"')
    .replace('hover:fill-[#1e293b]', 'hover:fill-[#2563eb] hover:stroke-cyan-400/60 cursor-pointer');
}).join('\n');

// 2. Extract Markers
const markGroupStart = lightSection.indexOf('<g id="map-markers-group">');
const svgCloseIdx = lightSection.indexOf('</svg>', markGroupStart);
const markGroupEnd = lightSection.lastIndexOf('</g>', svgCloseIdx);
if (markGroupStart === -1 || svgCloseIdx === -1 || markGroupEnd === -1) {
  console.error('Could not find markers group in scripts/indonesia_map_section.html');
  process.exit(1);
}

const rawMarkContent = lightSection.substring(markGroupStart + '<g id="map-markers-group">'.length, markGroupEnd);

// 3. Assemble Dark Theme Section
const darkSectionTemplate = `  <!-- ============================================================== -->
  <!-- SECTION JANGKAUAN MAP INDONESIA NASIONAL (DARK THEME - BERANDA) -->
  <!-- ============================================================== -->
  <section id="jangkauan-nasional" class="py-16 sm:py-24 bg-[#050c18] relative overflow-hidden border-t border-slate-800/80 text-white" data-theme-dark="true">
    
    <!-- Ambient Radial Glow Accents -->
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>

    <!-- Tech Grid Background Pattern -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 text-xs sm:text-sm font-semibold mb-4 shadow-lg shadow-red-950/40 backdrop-blur-md">
          <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.9)]"></span>
          JANGKAUAN OPERASIONAL NASIONAL
        </div>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          Jaringan Layanan Terpadu di Seluruh <span class="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">Indonesia</span>
        </h2>
        <p class="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
          Dengan lebih dari <span class="font-bold text-red-400">35+ titik operasional aktif</span> yang tersebar di sentra industri dan kota strategis nusantara, PT Group Mitra Indonesia siap memberikan respons cepat, personel terlatih, dan standar layanan prima 24/7.
        </p>

        <!-- Filter Region Buttons (Dark Theme) -->
        <div class="flex flex-wrap items-center justify-center gap-2 mt-6" id="map-region-filter">
          <button type="button" data-filter="all" class="map-filter-btn px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30 border border-red-500/80 transition-all cursor-pointer">
            Semua Titik (35+)
          </button>
          <button type="button" data-filter="jawa" class="map-filter-btn px-4 py-2 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:bg-slate-700/80 hover:text-white transition-all cursor-pointer backdrop-blur-sm">
            Pulau Jawa &amp; Banten
          </button>
          <button type="button" data-filter="sumatera" class="map-filter-btn px-4 py-2 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:bg-slate-700/80 hover:text-white transition-all cursor-pointer backdrop-blur-sm">
            Sumatera
          </button>
          <button type="button" data-filter="kalimantan" class="map-filter-btn px-4 py-2 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:bg-slate-700/80 hover:text-white transition-all cursor-pointer backdrop-blur-sm">
            Kalimantan &amp; IKN
          </button>
          <button type="button" data-filter="timur" class="map-filter-btn px-4 py-2 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:bg-slate-700/80 hover:text-white transition-all cursor-pointer backdrop-blur-sm">
            Sulawesi, Bali &amp; Timur
          </button>
        </div>
      </div>

      <!-- Map Display Container (Dark Glass Card) -->
      <div data-map-wrapper class="relative bg-gradient-to-b from-[#091424]/95 via-[#0a172a]/95 to-[#07101e]/95 rounded-3xl p-3 sm:p-6 lg:p-8 shadow-2xl shadow-black/70 border border-slate-700/70 backdrop-blur-xl ring-1 ring-white/5">
        
        <!-- Live Tooltip Floating Box (Dark Glass) -->
        <div id="map-tooltip" class="absolute z-30 pointer-events-none opacity-0 transition-opacity duration-200 bg-slate-900/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-slate-700/80 min-w-[230px] max-w-[290px] ring-1 ring-white/10">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shadow-[0_0_8px_rgba(239,68,68,0.9)]"></span>
            <span class="text-[10px] font-bold uppercase tracking-wider text-red-400" id="tooltip-province">Jawa Barat</span>
          </div>
          <h4 class="text-sm font-bold text-white tracking-wide" id="tooltip-city">Cikarang Industrial Hub</h4>
          <p class="text-xs text-slate-300 mt-0.5" id="tooltip-type">Industrial Security &amp; Manpower</p>
          <div class="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span class="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]"></span> Siaga 24/7
            </span>
            <span class="text-slate-400 font-medium">GMI Network</span>
          </div>
        </div>

        <!-- SVG Map Container -->
        <div class="w-full relative overflow-x-auto no-scrollbar">
          <div class="min-w-[680px] lg:min-w-0">
            <svg viewBox="0 0 1000 430" class="w-full h-auto select-none block" id="indonesia-interactive-map" aria-label="Peta Sebaran Layanan Nasional PT Group Mitra Indonesia">
              <defs>
                <filter id="indonesia-map-shadow" x="-5%" y="-5%" width="110%" height="115%">
                  <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#020813" flood-opacity="0.8" />
                </filter>
              </defs>

              <!-- Island Polygons Group -->
              <g filter="url(#indonesia-map-shadow)" id="map-provinces-group">
${darkProvContent}
              </g>

              <!-- Blinking Markers Group -->
              <g id="map-markers-group">
${rawMarkContent}
              </g>
            </svg>
          </div>
        </div>

        <!-- Map Footer Legend & Highlights (Dark Mode) -->
        <div class="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
          <div class="flex flex-wrap items-center gap-5 sm:gap-7">
            <div class="flex items-center gap-2">
              <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
              </span>
              <span class="font-medium text-slate-200">35+ Titik Operasional Aktif (Blinking)</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3.5 h-3.5 rounded-sm bg-[#162844] border border-slate-600/80 shadow-inner"></span>
              <span class="text-slate-300">Cakupan Wilayah Nusantara</span>
            </div>
          </div>

          <div class="flex items-center gap-2 text-slate-400">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Arahkan kursor / sentuh titik untuk melihat detail wilayah</span>
          </div>
        </div>

      </div>

      <!-- Quick Stats Under Map (Dark Tech Cards) -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8">
        <div class="bg-gradient-to-b from-[#0a1526]/90 to-[#07111f]/90 border border-slate-700/60 rounded-2xl p-5 text-center shadow-lg shadow-black/30 backdrop-blur-md relative overflow-hidden group hover:border-slate-500/80 transition-all">
          <div class="text-2xl sm:text-3xl font-black text-white tracking-tight">35+</div>
          <div class="text-xs text-slate-400 font-medium mt-1">Titik Kantor &amp; Posko Aktif</div>
        </div>
        <div class="bg-gradient-to-b from-[#0a1526]/90 to-[#07111f]/90 border border-red-500/30 rounded-2xl p-5 text-center shadow-lg shadow-black/30 backdrop-blur-md relative overflow-hidden group hover:border-red-500/60 transition-all">
          <div class="text-2xl sm:text-3xl font-black text-red-400 tracking-tight">34</div>
          <div class="text-xs text-slate-400 font-medium mt-1">Provinsi Siap Dilayani</div>
        </div>
        <div class="bg-gradient-to-b from-[#0a1526]/90 to-[#07111f]/90 border border-slate-700/60 rounded-2xl p-5 text-center shadow-lg shadow-black/30 backdrop-blur-md relative overflow-hidden group hover:border-slate-500/80 transition-all">
          <div class="text-2xl sm:text-3xl font-black text-white tracking-tight">10.000+</div>
          <div class="text-xs text-slate-400 font-medium mt-1">Personel Siaga Tersebar</div>
        </div>
        <div class="bg-gradient-to-b from-[#0a1526]/90 to-[#07111f]/90 border border-emerald-500/30 rounded-2xl p-5 text-center shadow-lg shadow-black/30 backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/60 transition-all">
          <div class="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">24/7</div>
          <div class="text-xs text-slate-400 font-medium mt-1">Monitoring &amp; Rapid Response</div>
        </div>
      </div>

    </div>
  </section>`;

// Replace in index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

let startIndex = indexHtml.indexOf('<!-- SECTION JANGKAUAN MAP INDONESIA NASIONAL (DARK THEME - BERANDA) -->');
if (startIndex === -1) {
  startIndex = indexHtml.indexOf('<!-- SECTION JANGKAUAN MAP INDONESIA NASIONAL (SHARED UI MAP)       -->');
}
const endMarker = '<!-- 7. KLIEN KAMI (Client Logos Showcase - Dual Row Marquee)       -->';
const endIndex = indexHtml.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Markers not found in index.html! startIndex:', startIndex, 'endIndex:', endIndex);
  process.exit(1);
}

const before = indexHtml.substring(0, startIndex);
const after = indexHtml.substring(endIndex);

const newIndexHtml = before + darkSectionTemplate + '\n\n  ' + after;
fs.writeFileSync('index.html', newIndexHtml, 'utf8');
console.log('Successfully updated index.html with dark theme map section!');

// Also ensure blog.html has data-map-wrapper on its map container
let blogHtml = fs.readFileSync('blog.html', 'utf8');
if (!blogHtml.includes('data-map-wrapper')) {
  blogHtml = blogHtml.replace(
    '<div class="relative bg-white rounded-3xl p-3 sm:p-6 lg:p-8 shadow-xl shadow-slate-900/5 border border-slate-200/80">',
    '<div data-map-wrapper class="relative bg-white rounded-3xl p-3 sm:p-6 lg:p-8 shadow-xl shadow-slate-900/5 border border-slate-200/80">'
  );
  fs.writeFileSync('blog.html', blogHtml, 'utf8');
  console.log('Added data-map-wrapper to blog.html (keeping light theme)');
} else {
  console.log('blog.html already has data-map-wrapper');
}

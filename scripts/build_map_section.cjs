const fs = require('fs');

const geojson = JSON.parse(fs.readFileSync('indonesia.geojson', 'utf8'));
const cities = JSON.parse(fs.readFileSync('scripts/indonesia_points.json', 'utf8'));

const minLon = 95.0;
const maxLon = 141.2;
const minLat = -11.1;
const maxLat = 6.1;

function project(lon, lat, width, height) {
  const x = ((lon - minLon) / (maxLon - minLon)) * width;
  function latToMerc(l) {
    const rad = (l * Math.PI) / 180;
    return Math.log(Math.tan(Math.PI / 4 + rad / 2));
  }
  const mercMin = latToMerc(minLat);
  const mercMax = latToMerc(maxLat);
  const mercY = latToMerc(lat);
  const y = ((mercMax - mercY) / (mercMax - mercMin)) * height;
  return [x, y];
}

const svgWidth = 1000;
const svgHeight = 430;

// Shades of charcoal/dark slate matching the user uploaded image
const provinceColors = [
  '#374151', '#404957', '#333b47', '#4b5563', '#39424e', 
  '#313744', '#3d4653', '#454e5b', '#353e4b', '#3c4450'
];

let provincePaths = [];
geojson.features.forEach((feature, idx) => {
  const name = feature.properties.state || feature.properties.name || `Provinsi ${idx + 1}`;
  const geom = feature.geometry;
  let polygons = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;
  
  let dList = [];
  polygons.forEach(polygon => {
    polygon.forEach(ring => {
      if (ring.length < 3) return;
      let ringD = '';
      ring.forEach((pt, i) => {
        const [x, y] = project(pt[0], pt[1], svgWidth, svgHeight);
        ringD += (i === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : ` L ${x.toFixed(1)} ${y.toFixed(1)}`);
      });
      ringD += ' Z';
      dList.push(ringD);
    });
  });
  
  if (dList.length > 0) {
    const fill = provinceColors[idx % provinceColors.length];
    provincePaths.push(`        <path d="${dList.join(' ')}" fill="${fill}" stroke="#ffffff" stroke-width="0.8" stroke-linejoin="round" class="province-polygon transition-colors duration-300 hover:fill-[#1e293b]" data-province="${name}"><title>${name}</title></path>`);
  }
});

// Generate Pin Markers
let markers = [];
const delays = ['0s', '0.3s', '0.6s', '0.9s', '1.2s', '1.5s', '1.8s', '2.1s'];

cities.forEach((c, idx) => {
  const [x, y] = project(c.lon, c.lat, svgWidth, svgHeight);
  const delay = delays[idx % delays.length];
  const islandGroup = c.region.includes('Jawa') || c.region.includes('Jakarta') || c.region.includes('Banten') || c.region.includes('Yogyakarta')
    ? 'jawa'
    : c.region.includes('Sumatera') || c.region.includes('Aceh') || c.region.includes('Riau') || c.region.includes('Lampung')
      ? 'sumatera'
      : c.region.includes('Kalimantan')
        ? 'kalimantan'
        : 'timur';

  markers.push(`        <!-- Pin ${idx + 1}: ${c.name} -->
        <g class="map-marker-group cursor-pointer group" data-region="${islandGroup}" data-city="${c.name}" data-province="${c.region}" data-type="${c.type}" transform="translate(${x.toFixed(1)}, ${y.toFixed(1)})">
          <!-- Blinking Pulse Wave 1 -->
          <circle r="7.5" fill="#ef4444" opacity="0.45" class="animate-ping" style="animation-duration: 2.2s; animation-delay: ${delay}; transform-origin: center;"></circle>
          <!-- Blinking Pulse Wave 2 -->
          <circle r="12" fill="#ef4444" opacity="0.2" class="animate-ping" style="animation-duration: 2.8s; animation-delay: ${delay}; transform-origin: center;"></circle>
          <!-- Outer White Border Ring -->
          <circle r="4.2" fill="#ffffff" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.4))"></circle>
          <!-- Inner Core Solid Red Dot -->
          <circle r="3" fill="#dc2626" class="transition-transform duration-200 group-hover:scale-150"></circle>
          <circle r="1.1" fill="#ffffff"></circle>
        </g>`);
});

const sectionTemplate = `
  <!-- ============================================================== -->
  <!-- SECTION JANGKAUAN MAP INDONESIA NASIONAL (35+ TITIK BLINKING)  -->
  <!-- ============================================================== -->
  <section id="jangkauan-nasional" class="py-16 sm:py-24 bg-white relative overflow-hidden border-t border-slate-100">
    <!-- Subtle Background Grid Pattern -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs sm:text-sm font-semibold mb-4 shadow-xs">
          <span class="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
          JANGKAUAN OPERASIONAL NASIONAL
        </div>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#061e43] tracking-tight">
          Jaringan Layanan Terpadu di Seluruh Indonesia
        </h2>
        <p class="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
          Dengan lebih dari <span class="font-bold text-red-600">35+ titik operasional aktif</span> yang tersebar di sentra industri dan kota strategis nusantara, PT Group Mitra Indonesia siap memberikan respons cepat, personel terlatih, dan standar layanan prima 24/7.
        </p>

        <!-- Filter Region Buttons -->
        <div class="flex flex-wrap items-center justify-center gap-2 mt-6" id="map-region-filter">
          <button type="button" data-filter="all" class="map-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-[#061e43] text-white shadow-xs transition-all cursor-pointer">
            Semua Titik (35+)
          </button>
          <button type="button" data-filter="jawa" class="map-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer">
            Pulau Jawa &amp; Banten
          </button>
          <button type="button" data-filter="sumatera" class="map-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer">
            Sumatera
          </button>
          <button type="button" data-filter="kalimantan" class="map-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer">
            Kalimantan &amp; IKN
          </button>
          <button type="button" data-filter="timur" class="map-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer">
            Sulawesi, Bali &amp; Timur
          </button>
        </div>
      </div>

      <!-- Map Display Container -->
      <div class="relative bg-white rounded-3xl p-3 sm:p-6 lg:p-8 shadow-xl shadow-slate-900/5 border border-slate-200/80">
        
        <!-- Live Tooltip Floating Box -->
        <div id="map-tooltip" class="absolute z-30 pointer-events-none opacity-0 transition-opacity duration-200 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-slate-200 min-w-[220px] max-w-[280px]">
          <div class="flex items-center gap-2 mb-1">
            <span class="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
            <span class="text-[10px] font-bold uppercase tracking-wider text-red-600" id="tooltip-province">Jawa Barat</span>
          </div>
          <h4 class="text-sm font-bold text-[#061e43]" id="tooltip-city">Cikarang Industrial Hub</h4>
          <p class="text-xs text-slate-500 mt-0.5" id="tooltip-type">Industrial Security &amp; Manpower</p>
          <div class="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-medium">
            <span class="inline-flex items-center gap-1 text-emerald-600 font-semibold">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Siaga 24/7
            </span>
            <span class="text-slate-400">GMI Network</span>
          </div>
        </div>

        <!-- SVG Map Container -->
        <div class="w-full relative overflow-x-auto no-scrollbar">
          <div class="min-w-[680px] lg:min-w-0">
            <svg viewBox="0 0 ${svgWidth} ${svgHeight}" class="w-full h-auto select-none block" id="indonesia-interactive-map" aria-label="Peta Sebaran Layanan Nasional PT Group Mitra Indonesia">
              <defs>
                <filter id="indonesia-map-shadow" x="-5%" y="-5%" width="110%" height="115%">
                  <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.14" />
                </filter>
              </defs>

              <!-- Island Polygons Group -->
              <g filter="url(#indonesia-map-shadow)" id="map-provinces-group">
${provincePaths.join('\n')}
              </g>

              <!-- Blinking Markers Group -->
              <g id="map-markers-group">
${markers.join('\n')}
              </g>
            </svg>
          </div>
        </div>

        <!-- Map Footer Legend & Highlights -->
        <div class="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <div class="flex flex-wrap items-center gap-5 sm:gap-7">
            <div class="flex items-center gap-2">
              <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
              <span class="font-medium text-slate-700">35+ Titik Operasional Aktif (Blinking)</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3.5 h-3.5 rounded-sm bg-[#374151] border border-white"></span>
              <span>Cakupan Wilayah Nusantara</span>
            </div>
          </div>

          <div class="flex items-center gap-2 text-slate-500">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Arahkan kursor / sentuh titik untuk melihat detail wilayah</span>
          </div>
        </div>

      </div>

      <!-- Quick Stats Under Map -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8">
        <div class="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center">
          <div class="text-2xl sm:text-3xl font-extrabold text-[#061e43]">35+</div>
          <div class="text-xs text-slate-600 font-medium mt-1">Titik Kantor &amp; Posko Aktif</div>
        </div>
        <div class="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center">
          <div class="text-2xl sm:text-3xl font-extrabold text-red-600">34</div>
          <div class="text-xs text-slate-600 font-medium mt-1">Provinsi Siap Dilayani</div>
        </div>
        <div class="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center">
          <div class="text-2xl sm:text-3xl font-extrabold text-[#061e43]">10.000+</div>
          <div class="text-xs text-slate-600 font-medium mt-1">Personel Siaga Tersebar</div>
        </div>
        <div class="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center">
          <div class="text-2xl sm:text-3xl font-extrabold text-emerald-600">24/7</div>
          <div class="text-xs text-slate-600 font-medium mt-1">Monitoring &amp; Rapid Response</div>
        </div>
      </div>

    </div>
  </section>
`;

fs.writeFileSync('scripts/indonesia_map_section.html', sectionTemplate);
console.log('Successfully generated scripts/indonesia_map_section.html, size:', sectionTemplate.length);

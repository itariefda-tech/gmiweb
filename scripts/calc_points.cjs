const fs = require('fs');

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

const cities = [
  // Jawa & Banten (Heavy concentration matching screenshot)
  { name: 'DKI Jakarta (Pusat & Tanjung Priok)', region: 'DKI Jakarta', lon: 106.8456, lat: -6.2088, type: 'Head Office & Security Hub' },
  { name: 'Tangerang & BSD City', region: 'Banten', lon: 106.6300, lat: -6.1783, type: 'Branch Office' },
  { name: 'Cilegon & Kawasan Industri Anyer', region: 'Banten', lon: 106.0538, lat: -6.0174, type: 'Industrial Security Hub' },
  { name: 'Bekasi Barat & Timur', region: 'Jawa Barat', lon: 106.9896, lat: -6.2383, type: 'Operational Center' },
  { name: 'Cikarang (Kawasan Industri GIIC / Delta)', region: 'Jawa Barat', lon: 107.1525, lat: -6.3262, type: 'Industrial Hub' },
  { name: 'Karawang (KIIC & Suryacipta)', region: 'Jawa Barat', lon: 107.2931, lat: -6.3042, type: 'Industrial Hub' },
  { name: 'Bogor & Sentul', region: 'Jawa Barat', lon: 106.8060, lat: -6.5971, type: 'Service Point' },
  { name: 'Purwakarta', region: 'Jawa Barat', lon: 107.4433, lat: -6.5561, type: 'Service Point' },
  { name: 'Bandung & Cimahi', region: 'Jawa Barat', lon: 107.6191, lat: -6.9175, type: 'Regional Branch' },
  { name: 'Sukabumi', region: 'Jawa Barat', lon: 106.9273, lat: -6.9277, type: 'Service Point' },
  { name: 'Cirebon', region: 'Jawa Barat', lon: 108.5570, lat: -6.7320, type: 'Operational Branch' },
  { name: 'Tegal & Brebes', region: 'Jawa Tengah', lon: 109.1256, lat: -6.8694, type: 'Service Point' },
  { name: 'Pekalongan', region: 'Jawa Tengah', lon: 109.6753, lat: -6.8886, type: 'Service Point' },
  { name: 'Semarang (Kawasan Berikat)', region: 'Jawa Tengah', lon: 110.4208, lat: -6.9932, type: 'Regional Hub Central Java' },
  { name: 'Kudus', region: 'Jawa Tengah', lon: 110.8421, lat: -6.8048, type: 'Service Point' },
  { name: 'Solo / Surakarta', region: 'Jawa Tengah', lon: 110.8290, lat: -7.5755, type: 'Branch Office' },
  { name: 'D.I. Yogyakarta', region: 'D.I. Yogyakarta', lon: 110.3695, lat: -7.7956, type: 'Representative Office' },
  { name: 'Cilacap (Kawasan Industri Energi)', region: 'Jawa Tengah', lon: 109.0059, lat: -7.7279, type: 'Special Security Unit' },
  { name: 'Surabaya (Rungkut & Margomulyo)', region: 'Jawa Timur', lon: 112.7521, lat: -7.2575, type: 'Regional Hub East Java' },
  { name: 'Gresik (Kawasan Industri JIIPE)', region: 'Jawa Timur', lon: 112.6555, lat: -7.1566, type: 'Industrial Security Hub' },
  { name: 'Sidoarjo', region: 'Jawa Timur', lon: 112.7183, lat: -7.4478, type: 'Service Point' },
  { name: 'Mojokerto (Ngoro Industrial Park)', region: 'Jawa Timur', lon: 112.4339, lat: -7.4726, type: 'Industrial Service' },
  { name: 'Pasuruan (PIER)', region: 'Jawa Timur', lon: 112.9075, lat: -7.6453, type: 'Industrial Service' },
  { name: 'Malang Raya', region: 'Jawa Timur', lon: 112.6326, lat: -7.9666, type: 'Branch Office' },
  { name: 'Banyuwangi', region: 'Jawa Timur', lon: 114.3646, lat: -8.2192, type: 'Logistic & Security Point' },
  
  // Sumatera
  { name: 'Medan & Pelabuhan Belawan', region: 'Sumatera Utara', lon: 98.6722, lat: 3.5952, type: 'Regional Hub North Sumatra' },
  { name: 'Banda Aceh', region: 'Aceh', lon: 95.3238, lat: 5.5483, type: 'Service Point' },
  { name: 'Pekanbaru & Dumai', region: 'Riau', lon: 101.4478, lat: 0.5071, type: 'Regional Hub Riau' },
  { name: 'Batam & Bintan', region: 'Kepulauan Riau', lon: 104.0305, lat: 1.1301, type: 'Special Economic Zone Hub' },
  { name: 'Palembang', region: 'Sumatera Selatan', lon: 104.7565, lat: -2.9761, type: 'Regional Branch' },
  { name: 'Bandar Lampung', region: 'Lampung', lon: 105.2663, lat: -5.3971, type: 'Logistics Hub' },
  
  // Kalimantan
  { name: 'Balikpapan & Kariangau', region: 'Kalimantan Timur', lon: 116.8942, lat: -1.2379, type: 'Regional Hub East Kalimantan' },
  { name: 'Samarinda & Penajam (IKN)', region: 'Kalimantan Timur', lon: 117.1536, lat: -0.5022, type: 'Capital Corridor Support' },
  { name: 'Banjarmasin', region: 'Kalimantan Selatan', lon: 114.5901, lat: -3.3194, type: 'Branch Office' },
  { name: 'Pontianak', region: 'Kalimantan Barat', lon: 109.3425, lat: -0.0263, type: 'Branch Office' },
  
  // Sulawesi, Bali, Nusa Tenggara, Papua
  { name: 'Makassar (KIMA & Pelabuhan)', region: 'Sulawesi Selatan', lon: 119.4327, lat: -5.1477, type: 'Regional Hub Eastern Indonesia' },
  { name: 'Manado & Bitung', region: 'Sulawesi Utara', lon: 124.8488, lat: 1.4748, type: 'Maritime & Facility Hub' },
  { name: 'Denpasar & Badung', region: 'Bali', lon: 115.2167, lat: -8.6705, type: 'Hospitality & Security Hub' },
  { name: 'Mataram & Mandalika', region: 'Nusa Tenggara Barat', lon: 116.1165, lat: -8.5833, type: 'Tourism Security Unit' },
  { name: 'Jayapura & Sorong', region: 'Papua', lon: 140.7181, lat: -2.5916, type: 'Strategic Outpost' }
];

console.log(`Calculated ${cities.length} location points.`);
cities.forEach((c, idx) => {
  const [x, y] = project(c.lon, c.lat, 1000, 420);
  c.x = parseFloat(x.toFixed(2));
  c.y = parseFloat(y.toFixed(2));
  c.xPercent = parseFloat(((x / 1000) * 100).toFixed(2));
  c.yPercent = parseFloat(((y / 420) * 100).toFixed(2));
});

fs.writeFileSync('scripts/indonesia_points.json', JSON.stringify(cities, null, 2));
console.log('Saved scripts/indonesia_points.json');

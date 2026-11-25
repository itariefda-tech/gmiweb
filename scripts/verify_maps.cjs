const fs = require('fs');
const idx = fs.readFileSync('index.html', 'utf8');
const blog = fs.readFileSync('blog.html', 'utf8');

const idxMarkers = (idx.match(/map-marker-group/g) || []).length;
const idxPaths = (idx.match(/province-polygon/g) || []).length;
const blogMarkers = (blog.match(/map-marker-group/g) || []).length;
const blogPaths = (blog.match(/province-polygon/g) || []).length;

console.log('Index markers:', idxMarkers, '| paths:', idxPaths);
console.log('Blog markers:', blogMarkers, '| paths:', blogPaths);
console.log('Index dark theme present:', idx.includes('data-theme-dark="true"'));
console.log('Blog light theme present:', blog.includes('class="py-16 sm:py-24 bg-white'));

if (idxMarkers !== 40 || blogMarkers !== 40 || idxPaths !== 34 || blogPaths !== 34) {
  console.error('MISMATCH DETECTED!');
  process.exit(1);
} else {
  console.log('ALL MAP DATA & COUNTS MATCH PERFECTLY!');
}

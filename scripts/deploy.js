import { execSync } from 'child_process';
import fs from 'fs';

console.log('📦 1. Building production files (npm run build)...');
execSync('npm run build', { stdio: 'inherit' });

console.log('🗜️  2. Creating archive dist.tar.gz...');
execSync('tar -czf dist.tar.gz -C dist .', { stdio: 'inherit' });

console.log('🚀 3. Uploading to VPS (ssh ovh)...');
execSync('scp dist.tar.gz ovh:/var/www/gmi.feira.my.id/', { stdio: 'inherit' });

console.log('📂 4. Extracting on VPS (/var/www/gmi.feira.my.id/)...');
execSync(
  'ssh ovh "tar -xzf /var/www/gmi.feira.my.id/dist.tar.gz -C /var/www/gmi.feira.my.id/ && rm /var/www/gmi.feira.my.id/dist.tar.gz"',
  { stdio: 'inherit' }
);

console.log('🧹 5. Cleaning up local temp file...');
if (fs.existsSync('dist.tar.gz')) {
  fs.unlinkSync('dist.tar.gz');
}

console.log('\n✨ Deployment successful! Live at: https://gmi.feira.my.id\n');

import { execSync } from 'child_process';
import fs from 'fs';

console.log('📦 1. Building production files...');
const buildCmd = process.platform === 'win32' ? 'npm.cmd run build' : 'npm run build';
execSync(buildCmd, { stdio: 'inherit' });

console.log('🗜️  2. Creating archive dist.tar.gz...');
execSync('tar -czf dist.tar.gz -C dist .', { stdio: 'inherit' });

console.log('🚀 3. Uploading to VPS (ssh ovh)...');
execSync('scp dist.tar.gz ovh:/var/www/gmiweb/', { stdio: 'inherit' });

console.log('📂 4. Extracting on VPS (/var/www/gmiweb/)...');
execSync(
  'ssh ovh "tar -xzf /var/www/gmiweb/dist.tar.gz -C /var/www/gmiweb/ && rm /var/www/gmiweb/dist.tar.gz"',
  { stdio: 'inherit' }
);

console.log('🧹 5. Cleaning up local temp file...');
if (fs.existsSync('dist.tar.gz')) {
  fs.unlinkSync('dist.tar.gz');
}

console.log('\n✨ Deployment successful! Live at: https://gmi.feira.my.id\n');

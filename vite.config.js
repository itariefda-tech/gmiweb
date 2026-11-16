import { resolve } from 'path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    port: 3000,
    host: true,
    strictPort: false,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        tentang: resolve(import.meta.dirname, 'tentang-kami.html'),
        layanan: resolve(import.meta.dirname, 'layanan-kami.html'),
        keamanan: resolve(import.meta.dirname, 'layanan-keamanan.html'),
        investigasi: resolve(import.meta.dirname, 'investigasi.html'),
        investigation: resolve(import.meta.dirname, 'investigation-service.html'),
        karir: resolve(import.meta.dirname, 'karir.html'),
        portal: resolve(import.meta.dirname, 'portal-klien.html'),
      },
    },
  },
});

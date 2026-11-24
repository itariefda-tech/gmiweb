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
        audit_piutang: resolve(import.meta.dirname, 'audit-pemulihan-piutang.html'),
        redirect_audit: resolve(import.meta.dirname, 'investigation-audit.html'),
        redirect_piutang: resolve(import.meta.dirname, 'optimalkan-keuangan-bisnis-anda.html'),
        karir: resolve(import.meta.dirname, 'karir.html'),
        portal: resolve(import.meta.dirname, 'portal-klien.html'),
        galeri: resolve(import.meta.dirname, 'galeri.html'),
        gallery: resolve(import.meta.dirname, 'gallery.html'),
        klien: resolve(import.meta.dirname, 'klien.html'),
        client: resolve(import.meta.dirname, 'client.html'),
        'contact-us': resolve(import.meta.dirname, 'contact-us.html'),
        kontak: resolve(import.meta.dirname, 'kontak.html'),
        blog: resolve(import.meta.dirname, 'blog.html'),
      },
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' ทำให้นำไปวางบน GitHub Pages หรือโฮสต์ใดก็ได้
export default defineConfig({
  plugins: [react()],
  base: './',
});

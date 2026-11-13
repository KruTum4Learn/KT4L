import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: '/' เพราะเว็บใช้ลิงก์แบบปกติ (/learn/<id>) ไฟล์ต้องโหลดจากรากเว็บเสมอ
export default defineConfig({
  plugins: [react()],
  base: '/',
});

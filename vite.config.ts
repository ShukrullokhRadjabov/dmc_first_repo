import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/dmc_first_repo/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

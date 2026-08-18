import react from '@vitejs/plugin-react';
import unocss from 'unocss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/tic-tact-toe',
  plugins: [unocss(), react()]
});

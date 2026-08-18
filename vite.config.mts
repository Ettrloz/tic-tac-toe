import react from '@vitejs/plugin-react';
import unocss from 'unocss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/tic-tac-toe',
  plugins: [unocss(), react()]
});

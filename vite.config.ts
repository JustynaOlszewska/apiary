/// <reference types="vitest" />
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// import { defineConfig } from 'vitest/config'
export default defineConfig({
  plugins: [vue()]
});

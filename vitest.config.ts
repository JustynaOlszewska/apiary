// / <reference types="vitest" />
// import vue from '@vitejs/plugin-vue';
// import { defineConfig } from 'vite';
// import { defineConfig } from 'vitest/config';
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';
import { UserConfig } from 'vitest';
export default mergeConfig(
  viteConfig as UserConfig | Promise<UserConfig>,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom'
    }
  })
);

// / <reference types="vitest" />
// import vue from '@vitejs/plugin-vue';
// import { defineConfig } from 'vite';
// import { defineConfig } from 'vitest/config';
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';
import { UserConfig } from 'vitest';
// import path from 'node:path';
import path from 'path';
export default mergeConfig(
  viteConfig as UserConfig | Promise<UserConfig>,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom'
    },
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, './src') },
        {
          find: '@interfaces',
          replacement: path.resolve(__dirname, './src/interfaces')
        },
        {
          find: '@stores',
          replacement: path.resolve(__dirname, './src/stores')
        },
        {
          find: '@components',
          replacement: path.resolve(__dirname, './src/components')
        },
        {
          find: '@constant',
          replacement: path.resolve(__dirname, './src/constant')
        },
        {
          find: '@assets',
          replacement: path.resolve(__dirname, './src/assets')
        }
      ]
    }
  })
);

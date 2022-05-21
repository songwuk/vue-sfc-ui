import path from 'path'
import Components from 'unplugin-vue-components/vite'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      'vue-sfc-ui': path.resolve(__dirname, '../src/index.ts'),
    },
  },
  plugins: [
    Vue({
      reactivityTransform: true,
    }),
    Components({
      dts: true,
      types: [
        {
          from: 'vue-sfc-ui',
          names: [
            'TabPane',
          ],
        },
      ],
    }),
  ],
})

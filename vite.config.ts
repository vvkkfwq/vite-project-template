import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import viteCompression from 'vite-plugin-compression';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      eslintOptions: {
        cache: false,
      },
    }),
    // gzip压缩 生产环境生成 .gz 文件
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  //  启动服务配置
  server: {
    port: 3000,
    open: true,
    https: false,
    proxy: {},
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
    },
  },
});

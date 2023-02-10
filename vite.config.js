import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',

  server: {
    port: 9527,
    open: false,
  },
  // 开启运行时编译，主要是解决h函数不渲染template的问题
  runtimeCompiler: true,

  build: {
    minify: 'terser', // 打包混淆方式
    brotliSize: false, // 禁用 brotli 压缩大小报告,以提高大型项目的构建性能。
    //去除 console debugger
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  plugins: [vue()],

  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js', // 开启运行时编译，主要是解决h函数不渲染template的问题
      // eslint-disable-next-line no-undef
      '@': resolve(__dirname, 'src'), // 别名 `@` 指向 `src` 目录 PS:IDEA编辑器还是不能识别
      // '@assets': resolve(__dirname, 'src/assets'),
      // '@components': resolve(__dirname, 'src/components'),
      // '@views': resolve(__dirname, 'src/views'),
      // '@utils': resolve(__dirname, 'src/utils'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/style/globalVar.scss";',
        javascriptEnabled: true,
      },
    },
  },
});

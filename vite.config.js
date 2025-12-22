import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    // 自定义插件：构建后重命名 HTML 文件
    {
      name: 'rename-html',
      closeBundle() {
        const distDir = path.resolve(__dirname, 'dist');
        const oldPath = path.join(distDir, 'index.vite.html');
        const newPath = path.join(distDir, 'index.html');
        if (fs.existsSync(oldPath)) {
          fs.renameSync(oldPath, newPath);
          console.log('✅ 已将 index.vite.html 重命名为 index.html');
        }
      }
    }
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.vite.html')
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-icons': ['lucide-react'],
          'vendor-leancloud': ['leancloud-storage']
        }
      }
    },
    minify: 'esbuild',
    chunkSizeWarningLimit: 500
  },
  // 使用 public 目录存放静态资源
  publicDir: 'public',
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react', 'leancloud-storage']
  }
});

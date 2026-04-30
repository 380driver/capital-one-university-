import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Output optimization
        outDir: 'dist',
        minify: 'esbuild',
        // Chunk splitting strategy
        rollupOptions: {
          output: {
            manualChunks: {
              // Split large libraries into separate chunks
              'react-vendor': ['react', 'react-dom'],
              'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
              'animation': ['framer-motion'],
              'charts': ['recharts'],
              'ui': ['lucide-react']
            },
            // Optimize chunk names
            chunkFileNames: 'js/[name]-[hash].js',
            entryFileNames: 'js/[name]-[hash].js',
            assetFileNames: (assetInfo) => {
              const info = assetInfo.name.split('.');
              const ext = info[info.length - 1];
              if (/png|jpe?g|gif|svg/i.test(ext)) {
                return `images/[name]-[hash][extname]`;
              } else if (/woff|woff2|eot|ttf|otf/.test(ext)) {
                return `fonts/[name]-[hash][extname]`;
              } else if (ext === 'css') {
                return `css/[name]-[hash][extname]`;
              }
              return `assets/[name]-[hash][extname]`;
            }
          }
        },
        // Performance hints
        chunkSizeWarningLimit: 1000,
        reportCompressedSize: true,
        // Source maps for production debugging
        sourcemap: 'hidden',
        // CSS optimization
        cssMinify: true,
        // Code splitting
        target: 'ES2022'
      }
    };
});

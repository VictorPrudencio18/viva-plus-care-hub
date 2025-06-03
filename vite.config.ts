
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from '@vite-pwa/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    VitePWA({
      registerType: 'prompt',
      srcDir: 'src/pwa',
      filename: 'sw.ts',
      strategies: 'injectManifest',
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        name: 'Viva+ Enterprise Care Hub',
        short_name: 'Viva+',
        description: 'Plataforma avançada de cuidados com saúde mental para servidores públicos',
        theme_color: '#0066cc',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon'
          },
          {
            src: '/placeholder.svg',
            type: 'image/svg+xml',
            sizes: '512x512',
            purpose: 'any maskable'
          }
        ],
        categories: ['health', 'medical', 'productivity'],
        screenshots: [
          {
            src: '/placeholder.svg',
            type: 'image/svg+xml',
            sizes: '1280x720',
            form_factor: 'wide'
          }
        ],
        shortcuts: [
          {
            name: 'Chat Viva',
            short_name: 'Chat',
            description: 'Acesso rápido ao assistente virtual',
            url: '/chat',
            icons: [{ src: '/placeholder.svg', sizes: '192x192' }]
          },
          {
            name: 'Termômetro',
            short_name: 'Humor',
            description: 'Avaliação rápida do estado emocional',
            url: '/termometro',
            icons: [{ src: '/placeholder.svg', sizes: '192x192' }]
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          charts: ['recharts'],
          design: ['class-variance-authority', 'clsx', 'tailwind-merge'],
        },
      },
    },
    sourcemap: mode === 'development',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'zustand'],
  },
}));

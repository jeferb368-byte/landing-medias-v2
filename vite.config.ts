import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Esta landing se sirve como subruta del dominio principal:
 * https://tiendamayor.com/medias-de-gel-para-talones
 *
 * `base` hace que todos los assets del build apunten a esa subruta.
 * Si algún día la mueves a su propio dominio, cambia base a '/'.
 */
export default defineConfig({
  base: '/medias-de-gel-para-talones/',
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[name]__[local]__[hash:base64:4]',
    },
  },
  server: {
    port: 5176,
    proxy: { '/api': { target: 'http://localhost:5000', changeOrigin: true } },
  },
  build: { outDir: 'dist', assetsInlineLimit: 2048 },
})

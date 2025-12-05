import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],

   optimizeDeps: {
    exclude: ['vue-select'], // Exclure vue-select de l'optimisation
    include: ['vue'] // Forcer l'inclusion de Vue
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 8181,  // <-- Ajoute cette ligne pour changer le port
    open: true,  // optionnel : ouvre automatiquement dans le navigateur
  }
})

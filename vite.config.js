import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    allowedHosts: ['.ngrok-free.app', '.ngrok.app', '.ngrok.io','nonextensively-monodomous-juana.ngrok-free.dev','animated-queijadas-e75077.netlify.app'],
  },
  build: {
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./index.html', import.meta.url)),
        menu: fileURLToPath(new URL('./menu.html', import.meta.url)),
      },
    },
  },
})

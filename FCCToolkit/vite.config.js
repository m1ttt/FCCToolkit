import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Todas las solicitudes que comiencen con /tabla_verdad serán redirigidas
      '/tabla_verdad': {
        // La dirección de tu servidor backend
        target: 'http://localhost:8000',
        // Cambia el host de la solicitud al objetivo, útil para evitar problemas de CORS
        changeOrigin: true,
        // Opcional: reescribe la ruta de la solicitud antes de enviarla al backend
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  define: {
    global: {},
  }
})

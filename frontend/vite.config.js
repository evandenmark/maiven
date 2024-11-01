import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({mode }) => {
  
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/users': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    }
  }
});
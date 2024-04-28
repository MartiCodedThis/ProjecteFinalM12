import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      'process.env.APP_ENV': JSON.stringify(env.APP_ENV),
      'process.env.APP_DEBUG': env.APP_DEBUG,
      'process.env.API_URL': JSON.stringify(env.API_URL)
    },
    plugins: [react()],
  }
})

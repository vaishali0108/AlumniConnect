import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// No need to import tailwind like this, just use postcss config
export default defineConfig({
  plugins: [react()],
})

import { defineConfig } from 'vite'
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react'
import path from'path'

// 取得 ESM 環境下的 `__dirname`
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// https://vite.dev/config/
export default defineConfig(()=>{

  return{
  plugins: [react()],
  resolve:{
    alias:{
      '@': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/assets/styles'),
      '@images': path.resolve(__dirname, './src/assets/images'),
        },
  },
  css:{
    preprocessorOptions:{
      scss:{
        additionalData:`
        @use '@styles/Mixin.scss' as *;`
      }
    }
  }
}
})

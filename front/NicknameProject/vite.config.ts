import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 이 줄을 추가하여 모든 네트워크 인터페이스에서 접근 가능하게 합니다.
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://6qwlr7vnq6.execute-api.ap-northeast-2.amazonaws.com/prod',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
    }
  }
})

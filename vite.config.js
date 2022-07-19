import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { execSync } from "child_process";

// 从git分支获取版本号
const getVer = () => {
    const branch =  execSync('git name-rev --name-only HEAD', {encoding: 'utf-8'});
    
    const ver = branch.split('/')[1].slice(0, 8);
    
    return ver;
}

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd())
  return {
    define: {
      'import.meta.env.VITE_MOCK': env.VITE_MOCK === 'true', // 自定义的环境变量加载出来是string类型
      'import.meta.env.VITE_APP_VER': getVer()
    },
    server: {
      host: 'localhost',
      port: '5173',
      proxy: {
        '/user': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/user/, '') // 为啥不能重写路径
        },
      }
    },
    plugins: [vue()]
  }
})

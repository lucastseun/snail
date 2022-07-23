import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { execSync } from "child_process";

// 从git分支获取版本号
const getVer = () => {
    const branch =  execSync('git name-rev --name-only HEAD', {encoding: 'utf-8'});
    
    const ver = branch.split('/')[1].slice(0, 8);
    
    return ver;
}

// 从env获取本地联调的地址
const getProxyUrl = (data = {}) => {
  const proxyUrl = {};
  for (const [key, value] of Object.entries(data)) {
    if (key.includes('_PROXY_')) {
      const [vite, proxy, name] = key.split('_'); // 获取配置的开发者名字
      proxyUrl[name] = value;
    }
  }
  return proxyUrl;
}

// 设置代理map
const setProxy = (proxyUrl = {}) => {
  const res = {};
  for (const [key, value] of Object.entries(proxyUrl)) {
    const reg = new RegExp(`^\/${key}`);
    res[`/${key}`] = {
      target: value,
      changeOrigin: true,
      rewrite: (path) => path.replace(reg, '')
    }
  }
  return res;
}

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd());
  const proxyUrl = getProxyUrl(env);

  return {
    define: {
      'import.meta.env.VITE_MOCK': env.VITE_MOCK === 'true', // 自定义的环境变量加载出来是string类型
      'import.meta.env.VITE_APP_VER': getVer()
    },
    server: {
      host: 'localhost',
      port: '5173',
      open: true,
      proxy: {
        ...setProxy(proxyUrl)
      }
    },
    plugins: [vue()]
  }
})

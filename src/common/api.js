const urlParams = new URLSearchParams(location.search);
let { env } = Object.fromEntries(urlParams.entries());
let urlfix = '';

// 开发环境，将env值置为development
if (import.meta.env.DEV) {
    env = 'development'
}
switch (env) {
    case 'development':
        urlfix = location.origin;
        break;
    case 'test1':
        urlfix = ''; // 测试地址
    default:
        urlfix = ''; // 生产地址
        break;
}
// 本地开发联调时，前缀拼接上对应后台开发者名字，详见.env.development.local
if (import.meta.env.DEV) {
    for (const key of Object.keys(import.meta.env)) {
        if (key.includes('_PROXY_')) {
            const [vite, proxy, name] = key.split('_');
            urlfix += `/${name}`
        }
    }
}

export default {
    SIGN_IN: urlfix + '/user/signin'
}
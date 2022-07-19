import Api from './api';
import { merge, stringify } from './utils';

const httpOk = async (opts = {}) => {
    let url = Api[opts.url] || '';
    if (import.meta.env.VITE_MOCK) {
        const urlArr = url.split('/');
        const urlName = urlArr[urlArr.length - 1];
        url = `/src/mock/${urlName}.json`;
        opts.method = 'GET';
    }
    const defaultInit = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        mode: 'same-origin', // cors、 no-cors 或者 same-origin
        credentials: 'same-origin', // omit、same-origin 或者 include
        cache: 'default', // default、 no-store、 reload 、 no-cache 、 force-cache 或者 only-if-cached
        redirect: 'follow', //  可用的 redirect 模式: follow (自动重定向), error (如果产生重定向将自动终止并且抛出一个错误）, 或者 manual (手动处理重定向). 在Chrome中默认使用follow
        referrer: 'client', // 一个 USVString 可以是 no-referrer、client或一个 URL。默认是 client
        referrerPolicy: 'no-referrer', // 指定了HTTP头部referer字段的值。可能为以下值之一： no-referrer、 no-referrer-when-downgrade、 origin、 origin-when-cross-origin、 unsafe-url
        integrity: '' // 包括请求的  subresource integrity 值 （ 例如： sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=）
    };
    
    const init = merge(defaultInit, opts);

    const contentType = init.headers['Content-Type'];

    if (contentType.indexOf('application/x-www-form-urlencoded') !== -1 ) {
        opts.data = stringify(opts.data);
    }

    if (contentType.indexOf('application/json') !== -1) {
        opts.data = JSON.stringify(opts.data);
    }

    if (!(init.method==='GET' || init.method==='HEAD')) {
        init.body = opts.data;
    }
    return await fetch(url, init).then(res => res.ok ? res.json() : res);
};

export default httpOk;
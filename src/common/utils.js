const merge = (target = {}, source = {}) => {
    for (const key in target) {
        if (Object.hasOwnProperty.call(target, key) && source[key]) {
            target[key] = source[key]
        }
    }
    return target
}

const stringify = (body = {}) => {
    const sr = new URLSearchParams()
    for (const key in body) {
        if (Object.hasOwnProperty.call(body, key)) {
            sr.append(key, body[key])
        }
    }
    return sr
}

const toUpperCase = (str = '') => Object.prototype.toUpperCase.call(str)

const toLowerCase = (str = '') => String.prototype.toLowerCase.call(str)

export {
    merge,
    stringify,
    toUpperCase,
    toLowerCase
}
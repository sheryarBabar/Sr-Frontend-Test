export const encode = (key: string, data: string) => {
    localStorage.setItem(key, data);
}

export const decode = (key: string) => {
    return localStorage.getItem(key)
}

export const remove = (key: string) => {
    localStorage.removeItem(key);
}
/** @format */

export const cropText = (str: string, length = 200) => {
    return str.length > length ? str.slice(0, length) + '...' : str
}

export const formatNumber = (n: number) => {
    if (n > 999 && n < 9999) return Math.round(n / 100) / 10 + ' k'
    if (n > 9999 && n < 999999) return Math.round(n / 1000) + ' k'
    if (n > 999999) return Math.round(n / 100000) / 10 + ' M'
    return `${n || 0}`
}

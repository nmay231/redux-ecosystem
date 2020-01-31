/** @format */

export const cropText = (str: string, length = 200) => {
    return str.length > length ? str.slice(0, length) + '...' : str
}

export const formatNumber = (n: number) => {
    if (n > 999 && n < 9999) return Math.round(n / 100) / 10 + '-k'
    if (n > 9999 && n < 999999) return Math.round(n / 1000) + '-k'
    if (n > 999999) return Math.round(n / 100000) / 10 + '-M'
    return `${n || 0}`
}

export const formatDate = (dateStr: string) => {
    //
}

export const sortByNPM = (a: any, b: any) => {
    const aNPM = a.npm_download_since_last_month ? a.npm_download_since_last_month : 0
    const bNPM = b.npm_download_since_last_month ? b.npm_download_since_last_month : 0

    return bNPM - aNPM
}

export const sortByGithub = (a: any, b: any) => {
    return b['github_star'] - a['github_star']
}

export const sortByDefault = (a: any, b: any) => {
    const aSortValue =
        a.npm_download_since_last_month > a.github_star
            ? a.npm_download_since_last_month
            : a.github_star || 0

    const bSortValue =
        b.npm_download_since_last_month > b.github_star
            ? b.npm_download_since_last_month
            : b.github_star || 0

    if (bSortValue > aSortValue) {
        return 1
    } else if (bSortValue < aSortValue) {
        return -1
    }

    return 0
}

/** @format */
import { TProjectFlat } from '~/typing'

export const cropText = (str: string, length = 200) => {
    return str.length > length ? str.slice(0, length) + '...' : str
}

export const formatNumber = (n: number) => {
    if (n > 999 && n < 9999) return Math.round(n / 100) / 10 + ' k'
    if (n > 9999 && n < 999999) return Math.round(n / 1000) + ' k'
    if (n > 999999) return Math.round(n / 100000) / 10 + ' M'
    return `${n || 0}`
}

export const formatDate = (dateStr: string) => {
    return dateStr
}

export const sortByNPM = (a: TProjectFlat, b: TProjectFlat) => {
    const aNPM = a.npmDownloadsThisMonth ? a.npmDownloadsThisMonth : 0
    const bNPM = b.npmDownloadsThisMonth ? b.npmDownloadsThisMonth : 0

    return bNPM - aNPM
}

export const sortByGithub = (a: TProjectFlat, b: TProjectFlat) => {
    return b.githubStars - a.githubStars
}

export const sortByDefault = (a: TProjectFlat, b: TProjectFlat) => {
    const aSortValue =
        a.npmDownloadsThisMonth > a.githubStars ? a.npmDownloadsThisMonth : a.githubStars || 0

    const bSortValue =
        b.npmDownloadsThisMonth > b.githubStars ? b.npmDownloadsThisMonth : b.githubStars || 0

    if (bSortValue > aSortValue) {
        return 1
    } else if (bSortValue < aSortValue) {
        return -1
    }

    return 0
}

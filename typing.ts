/** @format */

export interface TCategory {
    name: string
    slug: string
    subcategories: TSubcategory[]
}

export interface TSubcategory {
    name: string
    slug: string
    repositories: TRepository[]
}

export interface TRepository {
    name: string
    description: string
    githubURL: string
    githubLastUpdate: string
    githubStars: number
    altURLs: string[]
    npmDownloadsThisMonth: number
}

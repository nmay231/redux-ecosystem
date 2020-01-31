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
    github_url: string
    githubLastUpdate: string
    githubStars: number
    alt_urls: string[]
    npmDownloadsThisMonth: number
}

/** @format */

export interface TCategory {
    name: string
    slug: string
    subcategories: TSubCategory[]
}

export interface TSubCategory {
    name: string
    slug: string
    repositories: TRepository[]
}

export interface TRepository {
    name: string
    description: string
    githubURL: string
    altURLs: string[]
    npmDownloadsMonth: number
    githubStars: number
}

// Probably don't need this...
export namespace DB {
    export interface Category {
        name: string
        slug: string
        subcategories: SubCategory[]
    }

    export interface SubCategory {
        name: string
        slug: string
        repositories: Repository[]
    }

    export interface Repository extends Client.Repository {}
}

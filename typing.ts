/** @format */

import { NextApiRequest, NextApiResponse } from 'next'

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

export interface TRepositoryFlat {
    category: Pick<TCategory, 'name' | 'slug'>
    subcategory: Pick<TSubcategory, 'name' | 'slug'>
    name: string
    description: string
    githubURL: string
    githubLastUpdate: string
    githubStars: number
    altURLs: string[]
    npmDownloadsThisMonth: number
}

export type ReduxState = {
    rawRepositories: TRepositoryFlat[]
    overview: TCategoryPreview[]
    topic?: TCategory
}

export type Middleware<D = any> = (req: NextApiRequest, res: NextApiResponse<D>) => any

export interface TCategoryPreview {
    name: string
    slug: string
    subcategories: Array<Pick<TSubcategory, 'name' | 'slug'> & { repoCount: number }>
}

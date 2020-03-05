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
    projects: TProject[]
}

export interface TProject {
    name: string
    description: string
    githubURL: string
    altURLs: string[]
    githubStars: number
    githubLastRelease: string
    githubLastPush: string
    githubIsArchived: boolean
    npmDownloadsThisMonth: number
}

export interface TProjectFlat {
    id: number
    category: Pick<TCategory, 'name' | 'slug'>
    subcategory: Pick<TSubcategory, 'name' | 'slug'>
    name: string
    description: string
    githubURL: string
    githubLastRelease: string
    githubLastPush: string
    githubIsArchived: boolean
    githubStars: number
    altURLs: string[]
    npmDownloadsThisMonth: number
}

export type ReduxState = {
    rawProjects: TProjectFlat[]
    overview: TCategoryPreview[]
    topic?: TCategory
}

export type Middleware<D = any> = (req: NextApiRequest, res: NextApiResponse<D>) => any

export interface TCategoryPreview {
    name: string
    slug: string
    subcategories: Array<Pick<TSubcategory, 'name' | 'slug'> & { repoCount: number }>
}

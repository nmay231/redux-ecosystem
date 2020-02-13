/** @format */

import { Middleware, TCategory, TRepositoryFlat } from '../../typing'

import database from '../../public/database.json'

const categories = database.categories as TCategory[]

const all: TRepositoryFlat[] = categories.reduce(
    (prev, cat) => [
        ...prev,
        ...cat.subcategories.reduce(
            (prev, sub) => [
                ...prev,
                ...sub.repositories.map((repo) => ({
                    ...repo,
                    category: { name: cat.name, slug: cat.slug },
                    subcategory: { name: sub.name, slug: sub.slug },
                })),
            ],
            [] as TRepositoryFlat[],
        ),
    ],
    [] as TRepositoryFlat[],
)

const topics: Middleware<{ all: TRepositoryFlat[] }> = (req, res) => {
    res.json({ all })
}

export default topics

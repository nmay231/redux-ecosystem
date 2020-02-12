/** @format */

import { Middleware, TCategoryPreview, TCategory } from '../../typing'

import database from '../../public/database.json'

const preview: TCategoryPreview[] = (database.categories as TCategory[]).map((cat) => ({
    ...cat,
    subcategories: cat.subcategories.map((sub) => ({
        name: sub.name,
        slug: sub.slug,
        repoCount: sub.repositories.length,
    })),
}))

const filtered: Middleware<{ categories: TCategoryPreview[] }> = (req, res) => {
    res.json({ categories: preview })
}

export default filtered

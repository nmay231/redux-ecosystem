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

const overview: Middleware<{ overview: TCategoryPreview[] }> = (req, res) => {
    res.json({ overview: preview })
}

export default overview

/** @format */

import { Middleware, TCategory } from '../../typing'

import database from '../../public/database.json'

const categories: TCategory[] = database.categories

const detailed: Middleware<{ detailed: TCategory }> = (req, res) => {
    const { categorySlug } = req.query
    res.json({ detailed: categories.find((cat) => cat.slug === categorySlug) })
}

export default detailed

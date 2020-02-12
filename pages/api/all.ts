/** @format */

import { Middleware, TCategory } from '../../typing'

import database from '../../public/database.json'

const all = {
    lastUpdated: database.last_updated,
    categories: database.categories as TCategory[],
}

const topics: Middleware<{ all: typeof all }> = (req, res) => {
    res.json({ all })
}

export default topics

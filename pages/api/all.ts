/** @format */

import { Middleware } from '~/typing'

import { Project, Category, Subcategory } from '~/utils/db'

const topics: Middleware = async (req, res) => {
    const all = await Project.findAll({
        attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'categoryId', 'subcategoryId'] },
        include: [
            {
                model: Subcategory,
                attributes: ['name', 'slug'],
            },
            {
                model: Category,
                attributes: ['name', 'slug'],
            },
        ],
    })
    res.json({
        all,
    })
}

export default topics

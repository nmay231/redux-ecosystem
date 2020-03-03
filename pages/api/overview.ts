/** @format */

import sequelize from 'sequelize'

import { Middleware } from '~/typing'
import { Category, Subcategory, Project } from '~/utils/db'

const overview: Middleware = async (req, res) => {
    const overview = await Category.findAll({
        attributes: ['name', 'slug'],
        include: [
            {
                model: Subcategory,
                attributes: [
                    'name',
                    'slug',
                    [
                        sequelize.fn('COUNT', sequelize.col('subcategories.projects.id')),
                        'repoCount',
                    ],
                ],
                include: [{ model: Project, attributes: [] }],
            },
        ],
        group: ['subcategories.id'],
    })
    res.json({ overview })
}

export default overview

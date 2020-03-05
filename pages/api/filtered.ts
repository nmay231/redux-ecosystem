/** @format */

import sequelize from 'sequelize'
import { Middleware } from '~/typing'

import { Project } from '~/utils/db'

const filtered: Middleware = async (req, res) => {
    const { search, offset, chunkSize, sort } = {
        search: '',
        offset: '0',
        chunkSize: '20',
        sort: 'alphabetical',
        ...(req.query as { [key: string]: string }),
    }

    let order: sequelize.Order
    if (sort === 'github') {
        order = [['githubStars', 'DESC']]
    } else if (sort === 'npm') {
        order = [['npmDownloadsThisMonth', 'DESC']]
    } else {
        order = [sequelize.fn('LOWER', 'name')]
    }

    const filtered = await Project.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt', 'categoryId', 'subcategoryId'] },
        where: {
            [sequelize.Op.or]: {
                name: { [sequelize.Op.like]: `%${search}%` },
                description: { [sequelize.Op.like]: `%${search}%` },
            },
        },
        order,
        limit: parseInt(chunkSize),
        offset: parseInt(offset),
    })

    return res.json({ filtered })
}

export default filtered

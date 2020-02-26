/** @format */

import { Middleware, TCategory } from '~/typing'

import { Category, Subcategory, Project } from '~/utils/db'

const singleCategory: Middleware<{ singleCategory: TCategory }> = async (req, res) => {
    const { categorySlug } = req.query

    if (!categorySlug) {
        return res.json({ singleCategory: null })
    }

    const singleCategory = await Category.findOne({
        where: { slug: categorySlug },
        attributes: ['name', 'slug'],
        include: [
            {
                model: Subcategory,
                attributes: ['name', 'slug'],
                include: [
                    {
                        model: Project,
                        attributes: {
                            exclude: [
                                'id',
                                'createdAt',
                                'updatedAt',
                                'categoryId',
                                'subcategoryId',
                            ],
                        },
                    },
                ],
            },
        ],
    })
    res.json({ singleCategory })
}

export default singleCategory

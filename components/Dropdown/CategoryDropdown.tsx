/** @format */

import React from 'react'
import { NextPage } from 'next'

import { TCategory } from '../../typing'

interface CategoryProps {
    category: TCategory
}

const CategoryDropdown: NextPage<CategoryProps> = ({ category }) => {
    return (
        <div>
            <ul>
                <li>{category.name}</li>
            </ul>
        </div>
    )
}

export default CategoryDropdown

/** @format */

import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'

import styles from './CategoryPreview.module.css'
import { TCategory } from '../../typing'

interface CategoryPreviewProps {
    category: TCategory
}

const CategoryPreview: NextPage<CategoryPreviewProps> = ({ category }) => {
    return (
        <li className={styles.list_item}>
            <Link href={`/topic/${category.slug}`}>
                <a className={styles.link}>{category.name}</a>
            </Link>
            {category.subcategories.map((subcategory) => (
                <Link key={subcategory.slug} href={`/topic/${category.slug}/${subcategory.slug}`}>
                    <a className={styles.sub_topic}>{subcategory.name}</a>
                </Link>
            ))}
        </li>
    )
}

export default CategoryPreview

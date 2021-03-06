/** @format */

import React from 'react'
import Link from 'next/link'

import styles from './CategoryPreview.module.css'
import { TSubcategory } from '~/typing'

interface CategoryPreviewProps {
    name: string
    slug: string
    subcategories: Pick<TSubcategory, 'name' | 'slug'>[]
}

const CategoryPreview: React.FC<CategoryPreviewProps> = ({ name, slug, subcategories }) => {
    return (
        <li className={styles.list_item}>
            <Link as={`/topic/${slug}`} href="/topic/[category]">
                <a className={styles.link}>{name}</a>
            </Link>
            {subcategories.map((subcategory) => (
                <Link
                    key={subcategory.slug}
                    as={`/topic/${slug}/${subcategory.slug}`}
                    href="/topic/[category]/[subcategory]"
                >
                    <a className={styles.sub_topic}>{subcategory.name}</a>
                </Link>
            ))}
        </li>
    )
}

export default CategoryPreview

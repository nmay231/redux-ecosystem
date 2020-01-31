/** @format */

import React, { useState, useMemo } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'

import styles from './Category.module.css'
import { TCategory } from '../../typing'
import SubcategoryDropdown from './Subcategory'

interface CategoryProps {
    category: TCategory
}

const CategoryDropdown: NextPage<CategoryProps> = ({ category }) => {
    const router = useRouter()
    const currentSlug = router.asPath
        .split('/')
        .slice(2)
        .join('/')
    const [opened, setOpened] = useState(category.slug == currentSlug)

    const totalRepoCount = useMemo(
        () => category.subcategories.reduce((total, sub) => total + sub.repositories.length, 0),
        [category],
    )
    const allSubcategories = useMemo(() => ({ name: 'all', slug: category.slug }), [category])

    return (
        <div>
            <li className={styles.category_list}>
                <Link as={category.slug} href={category.slug}>
                    <a onClick={() => setOpened(!opened)}>{category.name}</a>
                </Link>
                {opened && (
                    <div className={opened ? styles.shown_list : styles.hidden_list}>
                        <SubcategoryDropdown
                            subcategory={allSubcategories}
                            repoCount={totalRepoCount}
                        />
                        {category.subcategories.length > 1 &&
                            category.subcategories.map((sub) => (
                                <SubcategoryDropdown
                                    key={sub.slug}
                                    subcategory={sub}
                                    repoCount={sub.repositories.length}
                                />
                            ))}
                    </div>
                )}
            </li>
        </div>
    )
}

export default CategoryDropdown

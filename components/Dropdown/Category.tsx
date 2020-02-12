/** @format */

import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import styles from './Category.module.css'
import { TCategoryPreview } from '../../typing'
import SubcategoryDropdown from './Subcategory'

interface CategoryProps {
    category: TCategoryPreview
}

const CategoryDropdown: React.FC<CategoryProps> = ({ category }) => {
    const router = useRouter()
    const currentSlug = router.asPath.split('/')[2]

    const totalRepoCount = useMemo(
        () => category.subcategories.reduce((total, sub) => total + sub.repoCount, 0),
        [category],
    )
    const allSubcategories = useMemo(() => ({ name: 'all', slug: category.slug }), [category])

    return (
        <div>
            <li className={styles.category_list}>
                <Link as={'/topic/' + category.slug} href={'/topic/' + category.slug}>
                    <a>{category.name}</a>
                </Link>
                {category.slug === currentSlug && (
                    <div>
                        <SubcategoryDropdown
                            name={allSubcategories.name}
                            slug={`${category.slug}`}
                            repoCount={totalRepoCount}
                        />
                        {category.subcategories.length > 1 &&
                            category.subcategories.map((sub) => (
                                <SubcategoryDropdown
                                    key={sub.slug}
                                    name={sub.name}
                                    slug={`${category.slug}/${sub.slug}`}
                                    repoCount={sub.repoCount}
                                />
                            ))}
                    </div>
                )}
            </li>
        </div>
    )
}

export default CategoryDropdown

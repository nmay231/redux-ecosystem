/** @format */

import React from 'react'
import Link from 'next/link'

import styles from './Subcategory.module.css'

interface SubcategoryProps {
    name: string
    slug: string
    repoCount: number
}

const SubcategorySidebar: React.FC<SubcategoryProps> = ({ name, slug, repoCount }) => {
    return (
        <div className="d-flex">
            <Link as={`/topic/${slug}`} href={'/topic/[category]/[subcategory]'}>
                <a className={styles.link}>
                    {name} ({repoCount})
                </a>
            </Link>
        </div>
    )
}

export default SubcategorySidebar

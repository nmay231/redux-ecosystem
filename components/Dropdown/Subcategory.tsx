/** @format */

import React from 'react'
import Link from 'next/link'

import styles from './Subcategory.module.css'

interface SubcategoryProps {
    name: string
    slug: string
    repoCount: number
    isAll?: boolean
}

const SubcategoryDropdown: React.FC<SubcategoryProps> = ({ name, slug, repoCount, isAll }) => {
    const href = isAll ? '/topic/[category]' : '/topic/[category]/[subcategory]'
    return (
        <div className="d-flex">
            <Link as={`/topic/${slug}`} href={href}>
                <a className={styles.link}>
                    {name} ({repoCount})
                </a>
            </Link>
        </div>
    )
}

export default SubcategoryDropdown

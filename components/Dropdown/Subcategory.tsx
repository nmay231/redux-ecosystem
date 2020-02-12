/** @format */

import React from 'react'
import Link from 'next/link'

import styles from './Subcategory.module.css'

interface SubcategoryProps {
    name: string
    slug: string
    repoCount: number
}

const SubcategoryDropdown: React.FC<SubcategoryProps> = ({ name, slug, repoCount }) => {
    return (
        <div className="d-flex">
            <Link href={`/topic/${slug}`}>
                <a className={styles.link}>
                    {name} ({repoCount})
                </a>
            </Link>
        </div>
    )
}

export default SubcategoryDropdown

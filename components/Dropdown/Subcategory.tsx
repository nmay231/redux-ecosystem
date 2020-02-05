/** @format */

import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'

import styles from './Subcategory.module.css'

interface SubcategoryProps {
    name: string
    slug: string
    repoCount: number
}

const SubcategoryDropdown: NextPage<SubcategoryProps> = ({ name, slug, repoCount }) => {
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

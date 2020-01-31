/** @format */

import React, { useState } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'

import styles from './Subcategory.module.css'
import { TSubcategory } from '../../typing'

interface SubcategoryProps {
    subcategory: Pick<TSubcategory, 'name' | 'slug'>
    repoCount: number
}

const SubcategoryDropdown: NextPage<SubcategoryProps> = ({ subcategory, repoCount }) => {
    return (
        <div className="d-flex">
            <Link href={'/topic/' + subcategory.slug}>
                <a className={styles.link}>
                    {subcategory.name} ({repoCount})
                </a>
            </Link>
        </div>
    )
}

export default SubcategoryDropdown

/** @format */

import React from 'react'
import { NextPage } from 'next'

import Category from './Category'
import styles from './index.module.css'
import { TCategory } from '../../typing'

interface DropdownProps {
    categories: TCategory[]
}

const Dropdown: NextPage<DropdownProps> = ({ categories }) => {
    return (
        <div className={styles.main}>
            <ul className="pl-0 pt-2">
                {categories.map((cat) => (
                    <Category key={cat.slug} category={cat} />
                ))}
            </ul>
        </div>
    )
}

export default Dropdown

/** @format */

import React, { useState } from 'react'
import { NextPage } from 'next'

import Category from './Category'
import styles from './index.module.css'
import { TCategory } from '../../typing'

interface DropdownProps {
    categories: TCategory[]
}

const dropdownId = 'dropdownDiv'

const scrollBarStyle = (percentage: number): React.HTMLAttributes<HTMLDivElement>['style'] => ({
    width: '3px',
    height: `calc(5rem - 1%)`,
    backgroundColor: 'black',
    top: `calc(${percentage}% + 1rem)`,
    position: 'absolute',
    right: '3px',
})

const Dropdown: NextPage<DropdownProps> = ({ categories }) => {
    const [scrollPercentage, setScrollPercentage] = useState(0)

    const handleScrollBar: React.UIEventHandler<HTMLDivElement> = (e) => {
        const scroll = e.currentTarget.scrollTop
        const height = e.currentTarget.scrollHeight - e.currentTarget.clientHeight
        setScrollPercentage((scroll / height) * 63)
    }

    return (
        <div className={styles.main} id={dropdownId} onScroll={handleScrollBar}>
            <ul className="pl-0 pt-2">
                {categories.map((cat) => (
                    <Category key={cat.slug} category={cat} />
                ))}
            </ul>
            <div style={scrollBarStyle(scrollPercentage)}></div>
        </div>
    )
}

export default Dropdown

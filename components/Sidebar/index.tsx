/** @format */

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Category from './Category'
import styles from './index.module.css'
import { TCategoryPreview } from '~/typing'

interface SidebarProps {
    categories: TCategoryPreview[]
}

const sidebarId = 'sidebarDiv'

const scrollBarStyle = (percentage: number): React.HTMLAttributes<HTMLDivElement>['style'] => ({
    width: '3px',
    height: `calc(5rem - 1%)`,
    backgroundColor: 'black',
    top: `calc(${percentage}% + 1rem)`,
    position: 'absolute',
    right: '3px',
})

const Sidebar: React.FC<SidebarProps> = ({ categories }) => {
    const router = useRouter()
    const { category: slug } = router.query as { category: string }

    const [scrollPercentage, setScrollPercentage] = useState(0)

    useEffect(() => {
        const index = categories.findIndex((cat) => cat.slug === slug)
        const scrolled = index / categories.length

        const sidebar = document.getElementById(sidebarId)
        console.log(scrolled * (sidebar.scrollHeight - sidebar.clientHeight))
        sidebar.scrollTop = scrolled * (sidebar.scrollHeight - sidebar.clientHeight)
    }, [slug])

    const handleScrollBar: React.UIEventHandler<HTMLDivElement> = (e) => {
        const scroll = e.currentTarget.scrollTop
        const height = e.currentTarget.scrollHeight - e.currentTarget.clientHeight
        setScrollPercentage((scroll / height) * 63)
    }

    return (
        <div className={styles.main} id={sidebarId} onScroll={handleScrollBar}>
            <ul className="pl-0 pt-2">
                {categories.map((cat) => (
                    <Category key={cat.slug} category={cat} />
                ))}
            </ul>
            <div style={scrollBarStyle(scrollPercentage)}></div>
        </div>
    )
}

export default Sidebar

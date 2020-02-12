/** @format */

import React from 'react'

import Meta from './Meta'
import Dropdown from '../Dropdown'
import Navigator from './Navigator'

import styles from './index.module.css'
import { TCategoryPreview } from '../../typing'

interface LayoutProps {
    categories: TCategoryPreview[]
    includeSidebar?: boolean
    title: string
    description: string
    canonical: string
}

const Layout: React.FC<LayoutProps> = ({
    children,
    categories,
    includeSidebar = true,
    ...metaData
}) => {
    return (
        <div>
            <Meta {...metaData} />
            <div className={styles.navigator}>
                <Navigator />
            </div>
            <main className="d-flex">
                {includeSidebar && (
                    <div className={styles.sidebar}>
                        <Dropdown categories={categories} />
                        <div className={styles.divider}></div>
                    </div>
                )}
                <div className={styles.content}>
                    <div className="col-12">{children}</div>
                </div>
            </main>
        </div>
    )
}

export default Layout

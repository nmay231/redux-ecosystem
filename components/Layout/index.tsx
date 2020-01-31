/** @format */

import React from 'react'
import { NextPage } from 'next'

import Meta from './Meta'
import Dropdown from '../Dropdown'
import Navigator from './Navigator'
import styles from './index.module.css'
import { TCategory } from '../../typing'

interface LayoutProps {
    data: {
        categories: TCategory[]
    }
    includeSidebar?: boolean
    title: string
    description: string
    canonical: string
}

const Layout: NextPage<LayoutProps> = ({ children, data, includeSidebar = true, ...metaData }) => {
    return (
        <div>
            <Meta {...metaData} />
            <div className={styles.navigator}>
                <Navigator />
            </div>
            <main className="d-flex">
                {includeSidebar && (
                    <div className={styles.sidebar}>
                        <Dropdown categories={data.categories} />
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

Layout.getInitialProps = async ({}) => {
    const r = await fetch('http://localhost:3000/database.json')
    const data: LayoutProps['data'] = await r.json()
    return {
        data,
        includeSidebar: true,
        title: 'Redux Ecosystem',
        description: 'A collection of links of the Redux Ecosystem',
        canonical: 'http://localhost:3000',
    }
}

export default Layout

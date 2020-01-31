/** @format */

import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'

import styles from './Navigator.module.css'

interface NavigatorProps {}

const Navigator: NextPage<NavigatorProps> = ({}) => {
    return (
        <nav>
            <div className={styles.brand}>
                <Link href="/">
                    <span className={styles.brand_link}>Redux Ecosystem</span>
                </Link>
            </div>
        </nav>
    )
}

export default Navigator

/** @format */

import React from 'react'
import Link from 'next/link'

import styles from './Navigator.module.css'

const Navigator: React.FC = () => {
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

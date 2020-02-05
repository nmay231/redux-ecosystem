/** @format */

import React, { useState } from 'react'
import { NextPage } from 'next'
import fetch from 'isomorphic-fetch'

import CategoryPreview from '../components/Utils/CategoryPreview'
import Layout from '../components/Layout'
import consts from '../utils/consts'
import { TCategory } from '../typing'

interface RootProps {
    categories: TCategory[]
}

const Root: NextPage<RootProps> = ({ categories }) => {
    return (
        <Layout
            title="Redux Ecosystem | Home page"
            canonical={consts.canonicalURL}
            description=""
            data={{ categories }}
        >
            {categories.map((cat) => (
                <CategoryPreview key={cat.slug} category={cat} />
            ))}
        </Layout>
    )
}

Root.getInitialProps = async ({}) => {
    const r = await fetch(`${consts.apiURL}/database.json`)
    return await r.json()
}

export default Root

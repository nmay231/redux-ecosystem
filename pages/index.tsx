/** @format */

import React from 'react'
import { NextPage } from 'next'
import fetch from 'isomorphic-fetch'

import CategoryPreview from '../components/Utils/CategoryPreview'
import Layout from '../components/Layout'
import consts from '../utils/consts'
import { TCategoryPreview } from '../typing'

interface RootProps {
    categories: TCategoryPreview[]
}

const Root: NextPage<RootProps> = ({ categories }) => {
    return (
        <Layout title="Redux Ecosystem | Home page" canonical={consts.canonicalURL} description="">
            {categories.map((cat) => (
                <CategoryPreview key={cat.slug} {...cat} />
            ))}
        </Layout>
    )
}

Root.getInitialProps = async ({}) => {
    const r = await fetch(`${consts.apiURL}/api/overview`)
    return await r.json()
}

export default Root

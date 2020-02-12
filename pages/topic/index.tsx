/** @format */

import React from 'react'
import { NextPage } from 'next'
import fetch from '../../utils/fetch'

import CategoryPreview from '../../components/Utils/CategoryPreview'
import Layout from '../../components/Layout'
import consts from '../../utils/consts'
import { TCategoryPreview } from '../../typing'

interface RootProps {
    categories: TCategoryPreview[]
}

const TopicRoot: NextPage<RootProps> = ({ categories }) => {
    return (
        <Layout
            title="Redux Ecosystem | Topics"
            canonical={consts.canonicalURL}
            description="A list of all the different topics in the redux ecosystem"
            categories={categories}
        >
            {categories.map((cat) => (
                <CategoryPreview key={cat.slug} {...cat} />
            ))}
        </Layout>
    )
}

TopicRoot.getInitialProps = async ({}) => {
    const r = await fetch('/api/overview')
    const { overview } = await r.json()
    return { categories: overview }
}

export default TopicRoot

/** @format */

import React, { useMemo } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-fetch'

import Layout from '../../../components/Layout'
import CardList from '../../../components/CardList'

import consts from '../../../utils/consts'
import { TCategoryPreview, TCategory } from '../../../typing'

interface CategoryProps {
    preview: TCategoryPreview[]
    detailed: TCategory
}

const Category: NextPage<CategoryProps> = ({ preview, detailed }) => {
    const router = useRouter()
    const currentSlug = router.asPath
        .split('/')
        .slice(2)
        .join('/')

    const category = useMemo(() => {
        console.log(preview)
        return preview.find((val) => val.slug === currentSlug)
    }, [preview, currentSlug])

    return (
        <Layout
            categories={preview}
            title={'Redux Ecosystem | ' + category.name}
            description="A collection of Redux-related addons, libraries, and utilities."
            canonical={consts.canonicalURL + router.asPath}
        >
            <CardList key={category.slug} category={detailed} />
        </Layout>
    )
}

Category.getInitialProps = async ({ asPath }) => {
    const categorySlug = asPath.split('/')[2]
    const r = await fetch(`${consts.apiURL}/api/overview`)
    const { overview } = await r.json()
    const r2 = await fetch(`${consts.apiURL}/api/single-category?categorySlug=${categorySlug}`)
    const { detailed } = await r2.json()
    return { preview: overview, detailed }
}

export default Category

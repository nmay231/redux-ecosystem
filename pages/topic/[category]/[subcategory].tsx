/** @format */

import React, { useMemo } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-fetch'

import Layout from '../../../components/Layout'
import CardList from '../../../components/CardList'

import consts from '../../../utils/consts'
import { TCategory, TCategoryPreview } from '../../../typing'

interface SubcategoryProps {
    overview: TCategoryPreview[]
    detailed: TCategory // TODO: detailed is an undescriptive name, please change the server api response...
}

const Subcategory: NextPage<SubcategoryProps> = ({ overview, detailed }) => {
    const router = useRouter()
    // TODO: make this more resilient to change please...
    const subcategorySlug = router.asPath.split('/')[3]

    detailed = useMemo(() => {
        const subcategory = detailed.subcategories.find((sub) => sub.slug === subcategorySlug)

        return {
            ...detailed,
            subcategories: [subcategory],
        }
    }, [detailed, subcategorySlug])

    return (
        <Layout
            title={'Redux Ecosystem | ' + detailed.name}
            description="A collection of Redux-related addons, libraries, and utilities."
            canonical={consts.canonicalURL + router.asPath}
            categories={overview}
        >
            <CardList key={detailed.slug} category={detailed} />
        </Layout>
    )
}

Subcategory.getInitialProps = async ({ asPath }) => {
    const categorySlug = asPath.split('/')[2]
    const r = await fetch(`${consts.apiURL}/api/overview`)
    const { overview } = await r.json()
    const r2 = await fetch(`${consts.apiURL}/api/single-category?categorySlug=${categorySlug}`)
    const { detailed } = await r2.json()
    return { overview, detailed }
}

export default Subcategory

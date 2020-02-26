/** @format */

import React, { useMemo } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { connect, ConnectedProps } from 'react-redux'

import Layout from '~/components/Layout'
import CardList from '~/components/CardList'

import fetch from '~/utils/fetch'
import consts from '~/utils/consts'
import { TCategory, ReduxState } from '~/typing'

interface GetInitialProps {
    singleCategory: TCategory
}

type MergedProps = ConnectedProps<typeof connectToRedux> & GetInitialProps

const Subcategory: NextPage<MergedProps, GetInitialProps> = ({ overview, singleCategory }) => {
    const router = useRouter()
    const { subcategory: subcategorySlug } = router.query as { subcategory: string }

    singleCategory = useMemo(() => {
        const subcategory = singleCategory.subcategories.find((sub) => sub.slug === subcategorySlug)

        return {
            ...singleCategory,
            subcategories: [subcategory],
        }
    }, [singleCategory, subcategorySlug])

    return (
        <Layout
            title={'Redux Ecosystem | ' + singleCategory.name}
            description="A collection of Redux-related addons, libraries, and utilities."
            canonical={consts.canonicalURL + router.asPath}
            categories={overview}
        >
            <CardList key={singleCategory.slug} category={singleCategory} />
        </Layout>
    )
}

Subcategory.getInitialProps = async ({ asPath }) => {
    const categorySlug = asPath.split('/')[2]
    const r2 = await fetch(`/api/single-category?categorySlug=${categorySlug}`)
    const { singleCategory } = await r2.json()
    return { singleCategory }
}

const connectToRedux = connect((state: ReduxState) => ({
    overview: state.overview,
}))

export default connectToRedux(Subcategory)

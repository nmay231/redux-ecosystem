/** @format */

import React, { useMemo } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { connect, ConnectedProps } from 'react-redux'

import Layout from '../../../components/Layout'
import CardList from '../../../components/CardList'

import fetch from '../../../utils/fetch'
import consts from '../../../utils/consts'
import { TCategory, ReduxState } from '../../../typing'

interface GetInitialProps {
    detailed: TCategory // TODO: detailed is an undescriptive name, please change the server api response...
}

type MergedProps = ConnectedProps<typeof connectToRedux> & GetInitialProps

const Subcategory: NextPage<MergedProps, GetInitialProps> = ({ overview, detailed }) => {
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
    const r2 = await fetch(`/api/single-category?categorySlug=${categorySlug}`)
    const { detailed } = await r2.json()
    return { detailed }
}

const connectToRedux = connect((state: ReduxState) => ({
    overview: state.overview,
}))

export default connectToRedux(Subcategory)

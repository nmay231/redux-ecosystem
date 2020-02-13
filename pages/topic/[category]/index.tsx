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
    detailed: TCategory
}

type MergedProps = ConnectedProps<typeof connectToRedux> & GetInitialProps

const Category: NextPage<MergedProps, GetInitialProps> = ({ overview, detailed }) => {
    const router = useRouter()
    const currentSlug = router.asPath
        .split('/')
        .slice(2)
        .join('/')

    const category = useMemo(() => {
        return overview.find((val) => val.slug === currentSlug)
    }, [overview, currentSlug])

    return (
        <Layout
            categories={overview}
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
    const r2 = await fetch(`/api/single-category?categorySlug=${categorySlug}`)
    const { detailed } = await r2.json()
    return { detailed }
}

const connectToRedux = connect((state: ReduxState) => ({
    overview: state.overview,
}))

export default connectToRedux(Category)

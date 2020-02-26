/** @format */

import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { NextPage } from 'next'

import CategoryPreview from '~/components/Utils/CategoryPreview'
import Layout from '~/components/Layout'
import consts from '~/utils/consts'
import { ReduxState } from '~/typing'

const Root: NextPage<ConnectedProps<typeof connectToRedux>> = ({ overview }) => {
    return (
        <Layout
            title="Redux Ecosystem | Home page"
            canonical={consts.canonicalURL}
            description="The Redux Ecosystem home page"
            categories={overview}
        >
            {overview.map((cat) => (
                <CategoryPreview key={cat.slug} {...cat} />
            ))}
        </Layout>
    )
}

const connectToRedux = connect((state: ReduxState) => ({
    projects: state.rawProjects,
    overview: state.overview,
}))

export default connectToRedux(Root)

/** @format */

import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { NextPage } from 'next'
import fetch from '../utils/fetch'

import CategoryPreview from '../components/Utils/CategoryPreview'
import Layout from '../components/Layout'
import consts from '../utils/consts'
import { TCategoryPreview, ReduxState } from '../typing'

interface RootProps {
    overview: TCategoryPreview[]
}
type Stupid = ConnectedProps<typeof connectToRedux> & RootProps
const Root: NextPage<Stupid, RootProps> = ({ overview, repositories }) => {
    return (
        <Layout
            title="Redux Ecosystem | Home page"
            canonical={consts.canonicalURL}
            description="The Redux Ecosystem home page"
            categories={overview}
        >
            {/* Useful for testing */}
            {/* <p>{JSON.stringify(repositories[1])}</p> */}
            {overview.map((cat) => (
                <CategoryPreview key={cat.slug} {...cat} />
            ))}
        </Layout>
    )
}

Root.getInitialProps = async ({}) => {
    const r = await fetch(`/api/overview`)
    const { overview } = await r.json()
    return { overview }
}

const connectToRedux = connect((state: ReduxState) => ({ repositories: state.rawRepositories }))

export default connectToRedux(Root)

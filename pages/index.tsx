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
const Root: NextPage<Stupid, RootProps> = ({ overview, projects }) => {
    return (
        <Layout
            title="Redux Ecosystem | Home page"
            canonical={consts.canonicalURL}
            description="The Redux Ecosystem home page"
            categories={overview}
        >
            {/* Useful for testing */}
            {/* <p>{JSON.stringify(projects[1])}</p> */}
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

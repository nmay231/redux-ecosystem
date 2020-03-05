/** @format */

import React, { useState, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { NextPage } from 'next'

import Layout from '~/components/Layout'
import Card from '~/components/CardList/Card'
import Radio from '~/components/Utils/Radio'
import consts from '~/utils/consts'
import { updateProjects } from '~/utils/redux'
import fetch from '~/utils/fetch'
import { ReduxState } from '~/typing'

const connectToRedux = connect((state: ReduxState) => ({
    overview: state.overview,
    rawProjects: state.rawProjects,
}))

const Root: NextPage<ConnectedProps<typeof connectToRedux>> = ({
    overview,
    rawProjects,
    dispatch,
}) => {
    const [searchTerms, setSearchTerms] = useState('')
    const [sort, setSort] = useState('alphabetical')

    useEffect(() => {
        const query = {
            search: searchTerms,
            sort,
        }
        fetch(`/api/filtered?${new URLSearchParams(query).toString()}`)
            .then((r) => r.json())
            .then(({ filtered }) => {
                dispatch(updateProjects(filtered))
            })
    }, [searchTerms, sort])

    return (
        <Layout
            title="Redux Ecosystem | Home page"
            canonical={consts.canonicalURL}
            description="The Redux Ecosystem home page"
            categories={overview}
            includeSidebar={false}
        >
            <div className="container-fluid">
                <div className="row">
                    <form className="form-inline col mx-auto mt-5">
                        <input
                            type="text"
                            id="searchbox"
                            className="form-control mx-auto"
                            onChange={(e) => setSearchTerms(e.target.value)}
                            value={searchTerms}
                            placeholder="Search projects"
                        />
                    </form>

                    <div className="col-12"></div>

                    <form className="form-inline mx-auto">
                        <span className="mx-2">Sort by:</span>
                        <Radio name="sortby" value="alphabetical" select={[sort, setSort]} inline>
                            Alphabetical
                        </Radio>
                        <Radio name="sortby" value="github" select={[sort, setSort]} inline>
                            Github Stars
                        </Radio>
                        <Radio name="sortby" value="npm" select={[sort, setSort]} inline>
                            NPM Downloads
                        </Radio>
                    </form>
                </div>

                <div className="row mt-2">
                    {rawProjects.map((project) => (
                        <Card project={project} key={project.name + project.id} />
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default connectToRedux(Root)

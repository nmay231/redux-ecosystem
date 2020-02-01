/** @format */

import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Meta from '../components/Layout/Meta'
import consts from '../utils/consts'

interface RootProps {
    test?: string
}

const Root: NextPage<RootProps> = ({ test }) => {
    const router = useRouter()
    // router.push('/topic/')
    return <></>
    const [selected, setSelected] = useState(0)
    const isSelected = (i: number) => i === selected
    return (
        <>
            <Meta
                title="Redux Ecosystem"
                description="A collection of Redux-related addons, libraries, and utilities."
                canonical={consts.canonicalURL}
            />
        </>
    )
}

Root.getInitialProps = async ({}) => {
    return { test: 'yellow' }
}

export default Root

/** @format */

import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

interface TopicProps {
    test?: string
}

const Topic: NextPage<TopicProps> = ({}) => {
    const router = useRouter()
    router.push('/')
    return <></>
}

export default Topic

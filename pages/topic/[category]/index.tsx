/** @format */

import React, { useMemo } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-fetch'

import Layout from '../../../components/Layout'
import CardList from '../../../components/CardList'
import { TCategory } from '../../../typing'

interface CategoryProps {
    data: {
        categories: TCategory[]
    }
}

const Category: NextPage<CategoryProps> = ({ data }) => {
    const router = useRouter()
    const currentSlug = router.asPath
        .split('/')
        .slice(2)
        .join('/')

    const category = useMemo(() => {
        return data.categories.find((val) => val.slug === currentSlug)
    }, [data.categories, currentSlug])

    return (
        <Layout
            data={data}
            title={'Redux Ecosystem | ' + category.name}
            description="A collection of Redux-related addons, libraries, and utilities."
            canonical={'https://localhost:3000' + router.asPath}
        >
            <CardList key={category.slug} category={category} />
        </Layout>
    )
}

Category.getInitialProps = async ({}) => {
    const r = await fetch('http://localhost:3000/database.json')
    const data: CategoryProps['data'] = await r.json()
    return { data }
}

export default Category

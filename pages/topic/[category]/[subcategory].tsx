/** @format */

import React, { useMemo } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-fetch'

import Layout from '../../../components/Layout'
import CardList from '../../../components/CardList'
import { TCategory } from '../../../typing'

interface SubcategoryProps {
    data: {
        categories: TCategory[]
    }
}

const Subcategory: NextPage<SubcategoryProps> = ({ data }) => {
    const router = useRouter()
    const currentSlug = router.asPath
        .split('/')
        .slice(2)
        .join('/')

    const category = useMemo(() => {
        const category = {
            ...data.categories.find((val) => val.slug === currentSlug.split('/')[0]),
        }
        category.subcategories = category.subcategories.filter((sub) => sub.slug === currentSlug)
        return category
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

Subcategory.getInitialProps = async ({}) => {
    const r = await fetch('http://localhost:3000/database.json')
    const data: SubcategoryProps['data'] = await r.json()
    return { data }
}

export default Subcategory

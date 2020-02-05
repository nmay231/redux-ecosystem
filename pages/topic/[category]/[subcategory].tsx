/** @format */

import React, { useMemo } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-fetch'

import Layout from '../../../components/Layout'
import CardList from '../../../components/CardList'

import consts from '../../../utils/consts'
import { TCategory } from '../../../typing'

interface SubcategoryProps {
    data: {
        categories: TCategory[]
    }
}

const Subcategory: NextPage<SubcategoryProps> = ({ data }) => {
    const router = useRouter()
    const [_, __, categorySlug, subcategorySlug] = router.asPath.split('/')

    const category = useMemo(() => {
        const category = {
            ...data.categories.find((val) => val.slug === categorySlug),
        }
        category.subcategories = category.subcategories.filter(
            (sub) => sub.slug === subcategorySlug,
        )
        return category
    }, [data.categories, categorySlug, subcategorySlug])

    return (
        <Layout
            data={data}
            title={'Redux Ecosystem | ' + category.name}
            description="A collection of Redux-related addons, libraries, and utilities."
            canonical={consts.canonicalURL + router.asPath}
        >
            <CardList key={category.slug} category={category} />
        </Layout>
    )
}

Subcategory.getInitialProps = async ({}) => {
    const r = await fetch(`${consts.apiURL}/database.json`)
    const data: SubcategoryProps['data'] = await r.json()
    return { data }
}

export default Subcategory

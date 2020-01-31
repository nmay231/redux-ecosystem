/** @format */

import Head from 'next/head'
import { NextPage } from 'next'

interface MetaProps {
    title: string
    description: string
    canonical: string
    image_url?: string
}

const Meta: NextPage<MetaProps> = ({ title, description, canonical }) => {
    title = title.slice(0, 90)
    description = description.slice(0, 250)
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/favicon.ico" />
            <link rel="canonical" href={canonical} />
            <link
                href="https://fonts.googleapis.com/css?family=Lato:300,300i,400,700"
                rel="stylesheet"
            />

            {/* Open Graph */}
            <meta name="og:type" property="og:type" content="website" />
            <meta name="og:title" property="og:title" content={title} />
            <meta name="og:description" property="og:description" content={description} />
            <meta property="og:site_name" content="Redux Ecosystem" />
            <meta property="og:url" content={canonical} />
            {/* <meta property="og:image" /> */}

            {/* Twitter */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:site" content="@acemarke" />
            <meta name="twitter:creator" content="@acemarke" />
            {/* <meta name="twitter:image" content="" /> */}
        </Head>
    )
}

export default Meta

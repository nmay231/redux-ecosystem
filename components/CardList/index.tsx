/** @format */

import React from 'react'
import { NextPage } from 'next'

import Card from './Card'
import { TCategory } from '../../typing'

interface CardListProps {
    category: TCategory
}

const CardList: NextPage<CardListProps> = ({ category }) => {
    return (
        <div className="mt-4">
            <h1>{category.name}</h1>
            {category.subcategories.map((sub) => (
                <div key={sub.slug} className="mt-2 mb-4">
                    <h2 className="ml-3">{sub.name}</h2>
                    <div className="row">
                        {sub.repositories.map((repo) => (
                            <Card key={repo.name} repo={repo} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CardList
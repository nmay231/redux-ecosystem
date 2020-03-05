/** @format */

import React from 'react'

import Card from './Card'
import { TCategory } from '~/typing'

interface CardListProps {
    category: TCategory
}

const CardList: React.FC<CardListProps> = ({ category }) => {
    return (
        <div className="mt-4">
            <h1>{category.name}</h1>
            {category.subcategories.map((sub) => (
                <div key={sub.slug} className="mt-2 mb-4">
                    <h2 className="ml-3">{sub.name}</h2>
                    <div className="row">
                        {sub.projects.map((project) => (
                            <Card key={project.name} project={project} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CardList

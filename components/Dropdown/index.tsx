/** @format */

import React from 'react'
import { NextPage } from 'next'

import Category from './CategoryDropdown'
import { TCategory } from '../../typing'

interface DropdownProps {
    categories: TCategory[]
}

const Dropdown: NextPage<DropdownProps> = ({ categories }) => {
    return (
        <div>
            {categories.map((cat) => (
                <Category category={cat} />
            ))}
        </div>
    )
}

export default Dropdown

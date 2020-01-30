/** @format */

import React from 'react'

const Category: React.FC = (props) => {
    return (
        <div>
            yolo
            {Object.keys(props)}
            <br />
            {Object.values(props)}
        </div>
    )
}

export default Category

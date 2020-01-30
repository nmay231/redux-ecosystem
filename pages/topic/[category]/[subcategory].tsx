/** @format */

import React from 'react'
import { useRouter } from 'next/router'

const Subcategory: React.FC = (props) => {
    const router = useRouter()
    props = router.query
    return (
        <div>
            asdf
            {Object.keys(props).map((k) => (
                <p>{k}</p>
            ))}
            <br />
            {Object.values(props)}
        </div>
    )
}

export default Subcategory

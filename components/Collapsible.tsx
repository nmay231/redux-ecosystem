/** @format */

import React, { useState } from 'react'

interface CollContProps {
    state: Array<{ a: number }>
}

export const CollapsibleContainer: React.FC<CollContProps> = ({ children }) => {
    const [selected, setSelected] = useState(0)
    return <>{children}</>
}

export const Collapsible = () => {
    return {
        a: 1,
    }
}

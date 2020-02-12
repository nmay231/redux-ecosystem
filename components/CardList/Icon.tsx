/** @format */

import React from 'react'
import { FaDownload, FaGithub, FaStar, FaLink } from 'react-icons/fa'

interface IconProps {
    icon: 'download' | 'github' | 'star' | 'link'
}

export const Icon: React.FC<IconProps> = ({ icon }) => {
    return (
        <>
            {icon === 'download' && <FaDownload className="mx-1" size={15} />}
            {icon === 'github' && <FaGithub className="mx-1" size={15} />}
            {icon === 'star' && <FaStar className="mx-1" size={15} />}
            {icon === 'link' && <FaLink className="mx-1" size={15} />}
        </>
    )
}

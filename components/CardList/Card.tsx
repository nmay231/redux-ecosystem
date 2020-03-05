/** @format */

import React from 'react'

import { Icon } from './Icon'
import styles from './Card.module.css'

import { TProject } from '~/typing'
import { cropText, formatNumber } from '~/utils'

interface CardProps {
    project: TProject
}

const Card: React.FC<CardProps> = ({ project }) => {
    const {
        npmDownloadsThisMonth: downloads,
        githubStars: stars,
        name,
        githubURL,
        altURLs: urls,
    } = project
    const date = project.githubLastRelease || project.githubLastPush

    const description = cropText(project.description)

    return (
        <div className="col-xxl-3 col-xl-4 col-lg-6 col-12 mt-3">
            <div className={styles.card_container}>
                <a
                    className={styles.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    href={githubURL || urls[0]}
                >
                    <div className={styles.header}>{name}</div>
                    <div className={styles.separator} />
                    <div className={styles.description}>{description}</div>
                </a>
                <div className={styles.description_links}>
                    {urls.length > 0 && (
                        <>
                            Sources
                            {urls.map((url) => (
                                <a
                                    key={url}
                                    className={styles.link}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Icon key={url} icon="link" />
                                    {cropText(url.split('://')[1] || url, 40)}
                                </a>
                            ))}
                        </>
                    )}
                </div>
                <div className={styles.stats}>
                    {githubURL && (
                        <>
                            <span className="mr-auto">Updated: {date}</span>
                            <span>
                                <Icon icon="star" />
                                <span>{formatNumber(stars)}</span>
                                <Icon icon="download" />
                                <span>{formatNumber(downloads)}</span>
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Card

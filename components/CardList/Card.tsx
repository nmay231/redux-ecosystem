/** @format */

import React from 'react'

import { Icon } from './Icon'
import styles from './Card.module.css'
import { cropText, formatNumber } from '../../utils'
import { TRepository } from '../../typing'

interface CardProps {
    repo: TRepository
}

const Card: React.FC<CardProps> = ({ repo }) => {
    const {
        npmDownloadsThisMonth: downloads,
        githubLastUpdate: date,
        githubStars: stars,
        name,
        githubURL,
        altURLs,
    } = repo

    const description = cropText(repo.description)

    return (
        <div className="col-xxl-3 col-xl-4 col-lg-6 col-12 mt-3">
            <div className={styles.card_container}>
                <a
                    className={styles.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    href={githubURL || altURLs[0]}
                >
                    <div className={styles.header}>{name}</div>
                    <div className={styles.separator} />
                    <div className={styles.description}>{description}</div>
                </a>
                <div className={styles.description_links}>
                    {altURLs.length > 0 && (
                        <>
                            Sources
                            {altURLs.map((url) => (
                                <a
                                    className={styles.link}
                                    href={url}
                                    target="_blank"
                                    rel="norefferer noopener"
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

/** @format */

import React from 'react'
import { NextPage } from 'next'

import { Icon } from './Icon'
import styles from './Card.module.css'
import { cropText, formatNumber } from '../../utils'
import { TRepository } from '../../typing'

interface CardProps {
    repo: TRepository
}

const Card: NextPage<CardProps> = ({ repo }) => {
    const {
        npmDownloadsThisMonth: downloads,
        githubLastUpdate: date,
        githubStars: stars,
        name,
        github_url,
        alt_urls,
    } = repo

    const description = cropText(repo.description)

    return (
        <div className="col-xxl-3 col-xl-4 col-lg-6 col-12 mt-3">
            <div className={styles.card_container}>
                <a
                    className={styles.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    href={github_url}
                >
                    <div className={styles.header}>{name}</div>
                    <div className={styles.separator} />
                    <div className={styles.description}>{description}</div>
                </a>
                <div className={styles.description_links}>
                    {alt_urls.length > 0 && (
                        <>
                            Other links
                            {alt_urls.map((url) => (
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
                    {github_url && (
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

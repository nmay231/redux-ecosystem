/** @format */

import React from 'react'
import { NextPage } from 'next'

import { Icon } from './Icon'
import styles from './Card.module.css'
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

    const description =
        repo.description.slice(0, 200) + (repo.description.length > 200 ? '...' : '')

    return (
        <div className="col-xxl-3 col-xl-4 col-lg-6 col-12 mt-3">
            <a className={styles.link} target="blank" rel="noreferrer noopener" href={github_url}>
                <div className={styles.card_container}>
                    <div className={styles.header}>{name}</div>
                    <div className={styles.separator} />
                    <div className={styles.description}>{description}</div>
                    <div className={styles.date}>Updated: {date}</div>
                    <div className={styles.stats}>
                        <Icon icon="star" />
                        <span>{stars}</span>
                        <Icon icon="download" />
                        <span>{downloads}</span>
                        {alt_urls &&
                            alt_urls.map((url) => (
                                <>
                                    <Icon key={url} icon="link" />
                                    {url}
                                </>
                            ))}
                    </div>
                </div>
            </a>
        </div>
    )
}

export default Card

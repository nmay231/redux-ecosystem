/** @format */

import React, { useState } from 'react'
import { NextPage } from 'next'
import Meta from '../components/Meta'

interface RootProps {
    test?: string
}

const Root: NextPage<RootProps> = ({ test }) => {
    const [selected, setSelected] = useState(0)
    const isSelected = (i: number) => i === selected
    return (
        <>
            <Meta
                title="Redux Ecosystem"
                description="A collection of Redux-related addons, libraries, and utilities."
                canonical="https://localhost:3000"
            />
            <main className="mt-5">
                <p>user: {test}</p>
                <div className="accordion" id="accordionExample">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h2 className="mb-0">
                                <a
                                    className={'' + isSelected(0) ? '' : ' collapsed'}
                                    data-toggle="collapse"
                                    data-target="#collapseOne"
                                    aria-expanded={isSelected(0)}
                                    aria-controls="collapseOne"
                                    onClick={() => setSelected(0)}
                                >
                                    Collapsible Group Item #1
                                </a>
                            </h2>
                        </div>

                        <div
                            id="collapseOne"
                            className={'collapse' + (isSelected(0) ? ' show' : '')}
                            aria-labelledby="headingOne"
                            data-parent="#accordionExample"
                        >
                            <div className="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
                                skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                                Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
                                single-origin coffee nulla assumenda shoreditch et. Nihil anim
                                keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
                                sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
                                occaecat craft beer farm-to-table, raw denim aesthetic synth
                                nesciunt you probably haven't heard of them accusamus labore
                                sustainable VHS.
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingTwo">
                            <h2 className="mb-0">
                                <button
                                    className={'btn btn-link' + isSelected(1) ? '' : ' collapsed'}
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#collapseTwo"
                                    aria-expanded={isSelected(1)}
                                    aria-controls="collapseTwo"
                                    onClick={() => setSelected(1)}
                                >
                                    Collapsible Group Item #2
                                </button>
                            </h2>
                        </div>
                        <div
                            id="collapseTwo"
                            className={'collapse' + (isSelected(1) ? ' show' : '')}
                            aria-labelledby="headingTwo"
                            data-parent="#accordionExample"
                        >
                            <div className="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
                                skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                                Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
                                single-origin coffee nulla assumenda shoreditch et. Nihil anim
                                keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
                                sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
                                occaecat craft beer farm-to-table, raw denim aesthetic synth
                                nesciunt you probably haven't heard of them accusamus labore
                                sustainable VHS.
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingThree">
                            <h2 className="mb-0">
                                <button
                                    className={'btn btn-link' + isSelected(2) ? '' : ' collapsed'}
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#collapseThree"
                                    aria-expanded={isSelected(2)}
                                    aria-controls="collapseThree"
                                    onClick={() => setSelected(2)}
                                >
                                    Collapsible Group Item #3
                                </button>
                            </h2>
                        </div>
                        <div
                            id="collapseThree"
                            className={'collapse' + (isSelected(2) ? ' show' : '')}
                            aria-labelledby="headingThree"
                            data-parent="#accordionExample"
                        >
                            <div className="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
                                skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                                Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
                                single-origin coffee nulla assumenda shoreditch et. Nihil anim
                                keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
                                sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
                                occaecat craft beer farm-to-table, raw denim aesthetic synth
                                nesciunt you probably haven't heard of them accusamus labore
                                sustainable VHS.
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

Root.getInitialProps = async ({}) => {
    return { test: 'yellow' }
}

export default Root

/** @format */

import { NextApiRequest, NextApiResponse } from 'next'

export type Middleware = (req: NextApiRequest, res: NextApiResponse) => any

const topics: Middleware = (req, res) => {
    res.json('yolo')
}

export default topics

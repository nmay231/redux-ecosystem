/** @format */

import fetch from 'isomorphic-fetch'

import consts from './consts'

const myFetch: typeof fetch = async (uri, context) => {
    try {
        // Try fetching with relative paths for the client side
        return await fetch(uri, context)
    } catch (e) {
        // Otherwise, default to server with node-fetch
        return await fetch(`${consts.apiURL}${uri}`, context)
    }
}

export default myFetch

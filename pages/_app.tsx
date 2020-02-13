/** @format */

import NextApp from 'next/app'
import { Provider } from 'react-redux'
import withRedux, { AppProps, NextJSAppContext } from 'next-redux-wrapper'

import '../scss/custom.css'
import fetch from '../utils/fetch'
import { makeStore, initialData } from '../utils/redux'
import { TRepositoryFlat } from '../typing'

class App extends NextApp<AppProps> {
    static async getInitialProps({ Component, ctx }: NextJSAppContext) {
        const r = await fetch('/api/all')
        const { all }: { all: TRepositoryFlat[] } = await r.json()
        ctx.store.dispatch(initialData(all))

        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

        return { pageProps }
    }

    render() {
        const { Component, pageProps, store } = this.props
        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        )
    }
}

export default withRedux(makeStore)(App)

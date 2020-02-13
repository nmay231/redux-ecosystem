/** @format */

import { ReduxState } from '../../typing'
import { Reducer, createStore } from 'redux'
import { MakeStore } from 'next-redux-wrapper'

const initialState: ReduxState = {
    foo: 'string',
    rawRepositories: [],
}

const reducer: Reducer<ReduxState> = (state: ReduxState = initialState, action) => {
    switch (action.type) {
        case 'FOO':
            return { ...state, foo: action.payload }
        case 'INITIAL_DATA':
            return { ...state, rawRepositories: action.all }
        default:
            return state
    }
}

export const initialData = (all: ReduxState['rawRepositories']) => ({
    type: 'INITIAL_DATA',
    all: all,
})

export const makeStore: MakeStore = (initialState_ = initialState, options) => {
    return createStore(reducer, initialState_)
}

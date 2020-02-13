/** @format */

import { ReduxState } from '../../typing'
import { Reducer, createStore } from 'redux'
import { MakeStore } from 'next-redux-wrapper'

const initialState: ReduxState = {
    rawRepositories: [],
    overview: [],
    topic: undefined,
}

const reducer: Reducer<ReduxState> = (state: ReduxState = initialState, action) => {
    switch (action.type) {
        case 'INITIAL_DATA':
            return { ...state, rawRepositories: action.all, overview: action.overview }
        default:
            return state
    }
}

export const initialData = (
    all: ReduxState['rawRepositories'],
    overview?: ReduxState['overview'],
) => ({
    type: 'INITIAL_DATA',
    all,
    overview,
})

export const makeStore: MakeStore = (initialState_ = initialState) => {
    return createStore(reducer, initialState_)
}

import { createStore, applyMiddleware, compose } from 'redux';
import RR from '../reducers';
import logger from 'redux-logger';
import { persistReducer, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createEpicMiddleware } from 'redux-observable'
import RE from '../epics';
// import { routerMiddleware } from 'react-router-redux';
// import rootEpic from '../epics';
// import {createBrowserHistory} from 'history'

// export const browserHistory = createBrowserHistory()
const middleware = []
middleware.push(logger)

const persistConfig = {
    timeout: 10000,
    key: 'root',
    storage: storage,
    blacklist: [],
    migrate: (state) => {
        console.log('Migration Running!', state)
        return Promise.resolve(state)
    }
}

const removeError = createTransform(
    (inboundState, key) => {
        // console.log('-----------------inbound------------------', inboundState, key)
        return { ...inboundState }
    },
    (outboundState, key) => {
        // console.log('-----------------outbound------------------', outboundState, key)
        delete outboundState.error
        return { ...outboundState }
    }
)

const PR = persistReducer({ ...persistConfig, transforms: [removeError] }, RR)
// const router = routerMiddleware(browserHistory);

//Enable Debugger cho React-Native-Debugger
const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

//Nhúng Epics
const epicMiddleware = createEpicMiddleware()
middleware.push(epicMiddleware)

const configureStore = (initialState) => {
    var store = createStore(PR, initialState, composeEnhancers(applyMiddleware(...middleware)));
    epicMiddleware.run(RE)
    return store
}

export default configureStore
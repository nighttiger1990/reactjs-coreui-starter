import { createStore, applyMiddleware, compose } from 'redux';
import RR from '../reducers';
import logger from 'redux-logger';
// import { createEpicMiddleware } from 'redux-observable'
// import { routerMiddleware } from 'react-router-redux';
// import rootEpic from '../epics';
// import {createBrowserHistory} from 'history'

// export const browserHistory = createBrowserHistory()
const middleware = []
middleware.push(logger)

// const router = routerMiddleware(browserHistory);
// const epicMiddleware = createEpicMiddleware(rootEpic);


//Enable Debugger cho React-Native-Debugger
const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose


const configureStore = (initialState) => {
    return createStore(RR, initialState, composeEnhancers(applyMiddleware(...middleware)));
}

export default configureStore
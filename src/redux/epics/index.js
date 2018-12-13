import { combineEpics } from 'redux-observable'
import authEpics from './auth'
import mailEpics from './mail';
import contactEpics from './contact';
const RE = combineEpics(
    ...authEpics,
    ...mailEpics,
    ...contactEpics
    )

export default RE
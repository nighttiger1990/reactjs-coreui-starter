import { combineEpics } from 'redux-observable'
import authEpics from './auth'
import mailEpics from './mail';
import contactEpics from './contact';
import contactGroupEpics from './contactGroup';
import campaignEpics from './campaign'
import mailTemplateEpics from './mailTemplate'
const RE = combineEpics(
    ...authEpics,
    ...mailEpics,
    ...contactEpics,
    ...contactGroupEpics,
    ...campaignEpics,
    ...mailTemplateEpics
)

export default RE
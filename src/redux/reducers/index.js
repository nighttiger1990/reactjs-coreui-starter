import { combineReducers } from 'redux'

import auth from './auth'
import contact from './contact'
import contactGroup from './contactGroup'
import campaign from './campaign'
import mailTemplate from './mailTemplate'
const RR = combineReducers({
  auth,
  contact,
  contactGroup,
  campaign,
  mailTemplate
})
export default RR
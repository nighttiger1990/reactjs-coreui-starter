import { combineReducers } from 'redux'

import auth from './auth'
import contact from './contact'
import contactGroup from './contactGroup'
const RR = combineReducers({
  auth,
  contact,
  contactGroup
})
export default RR
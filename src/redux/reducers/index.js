import { combineReducers } from 'redux'

import auth from './auth'
import contact from './contact'
const RR = combineReducers({
  auth,
  contact
})
export default RR
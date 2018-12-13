import Axios from "axios";
// import { Observable } from 'rxjs'
// eslint-disable-next-line
import { ActionsObservable, StateObservable, ofType } from 'redux-observable'
// eslint-disable-next-line
import { mergeMap, concatMap, flatMap, switchMap } from 'rxjs/operators'
import RA from '../actions'
import RT from "../types";
// eslint-disable-next-line
import { of, from, NEVER, EMPTY } from "rxjs";


/**
 * 
 * @param {ActionsObservable} action$ 
 * @param {StateObservable} state$ 
 */
const checkAuthEpics = (action$, state$) => {
    // console.warn("checkAuthEpics====> RUNNING\n", state$)
    return action$.pipe(
        ofType(RT.CHECK_AUTH),
        mergeMap(
            (action, idx) => {
                // console.log('=====>Observable RUNNING<=====', action, idx)
                let url = "http://42.115.221.35:9091/login"
                let data = { username: "truongbl", passsword: "123" }
                return Axios.post(url, data)
                    .then(res => {
                        if (res && res.data && res.data.status === 1) {
                            return RA.setUserSuccess(res.data.data, action.onCallback)
                        } else {
                            return RA.setUserFail(res.data.message, action.onCallback)
                        }
                    })
                    .catch(err => {
                        return RA.setUserFail(err, action.onCallback)
                    })
            }
        ))
}
/**
 * 
 * @param {ActionsObservable} action$ 
 * @param {StateObservable} state$ 
 */
const setUserSuccessEpics = (action$, state$) => {
    // console.warn('setUserSuccessEpics\n', state$)
    return action$.pipe(
        ofType(RT.CHECK_AUTH_SUCCESS),
        switchMap(
            (action, idx) => {
                // console.log('=====>Observable RUNNING Success<=====', action, idx)
                if (action.onCallback && typeof action.onCallback == 'function') {
                    action.onCallback({ hasError: false, payload: action.payload })
                }
                return EMPTY
            }
        )
    )
}
const setUserFailEpics = (action$, state$) => {
    console.warn('setUserFailEpics\n', state$)
    return action$.pipe(
        ofType(RT.CHECK_AUTH_FAIL),
        switchMap(
            (action, idx) => {
                // console.log('=====>Observable RUNNING Fail<=====', action, idx)
                if (action.onCallback && typeof action.onCallback == 'function') {
                    action.onCallback({ hasError: true, payload: action.payload })
                }
                return EMPTY
            }
        )
    )
}

const authEpics = [
    checkAuthEpics,
    setUserSuccessEpics,
    setUserFailEpics
]

export default authEpics
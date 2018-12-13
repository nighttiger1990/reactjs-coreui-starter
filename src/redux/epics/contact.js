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
import RC from "../../config";
import queryString from 'querystring'

/**
 * 
 * @param {ActionsObservable} action$ 
 * @param {StateObservable} state$ 
 */
const fetchContactEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.FETCH_CONTACT),
        mergeMap(
            (action, idx) => {
                let data = action.payload
                let url = RC.API_CONTACT + "?" + queryString.stringify(data)
                console.log(url)
                return Axios.get(url, data)
                    .then(res => {
                        if (res && res.data && res.data.message === "Ok") {
                            return RA.fetchContactSuccess(res.data.data.data, action.onCallback)
                        } else {
                            return RA.fetchContactFail(res.data.message, action.onCallback)
                        }
                    })
                    .catch(err => {
                        return RA.fetchContactFail(err, action.onCallback)
                    })
            }
        ))
}
/**
 * 
 * @param {ActionsObservable} action$ 
 * @param {StateObservable} state$ 
 */
const fetchContactSuccessEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.FETCH_CONTACT_SUCCESS),
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

/**
 * 
 * @param {ActionsObservable} action$ 
 * @param {StateObservable} state$ 
 */
const fetchContactFailEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.FETCH_CONTACT_FAIL),
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

const contactEpics = [
    fetchContactEpics,
    fetchContactSuccessEpics,
    fetchContactFailEpics
]

export default contactEpics
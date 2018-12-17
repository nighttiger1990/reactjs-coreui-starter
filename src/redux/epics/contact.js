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
                        console.log("call fetchContactEpics good", res)
                        if (res && res.data && res.data.StatusCode === 200) {
                            return RA.fetchContactSuccess(res.data.Data, action.onCallback)
                        } else {
                            return RA.fetchContactFail(res.data.Message, action.onCallback)
                        }
                    })
                    .catch(err => {
                        console.log("call fetchContactEpics fail", err)
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

/**
 * 
 * @param {ActionsObservable} action$ 
 * @param {StateObservable} state$ 
 */
const cContactEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.C_CONTACT),
        mergeMap(
            (action, idx) => {
                let data = action.payload
                let url = RC.API_CONTACT
                return Axios.post(url, data)
                    .then(res => {
                        if (res && res.data && res.data.StatusCode === 200) {
                            return RA.cContactSuccess(res.data.Data, action.onCallback)
                        } else {
                            return RA.cContactFail(res.data.Message, action.onCallback)
                        }
                    })
                    .catch(err => {
                        return RA.cContactFail(err, action.onCallback)
                    })
            }
        ))
}

/**
 * 
 * @param {ActionsObservable} action$ 
 * @param {StateObservable} state$ 
 */
const cContactSuccessEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.C_CONTACT_SUCCESS),
        switchMap(
            (action, idx) => {
                // console.log('=====>Observable RUNNING Success<=====', action, idx)
                if (action.onCallback && typeof action.onCallback == 'function') {
                    let dataCallback = { hasError: false, payload: action.payload }
                    action.onCallback(dataCallback)
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
const cContactFailEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.C_CONTACT_FAIL),
        switchMap(
            (action, idx) => {
                // console.log('=====>Observable RUNNING Fail<=====', action, idx)
                if (action.onCallback && typeof action.onCallback == 'function') {
                    let dataCallback = { hasError: true, payload: action.payload }
                    action.onCallback(dataCallback)
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
const uContactEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.U_CONTACT),
        mergeMap(
            (action, idx) => {
                let data = action.payload
                let url = `${RC.API_CONTACT}/${data.Id} `
                return Axios.put(url, data)
                    .then(res => {
                        if (res && res.data && res.data.StatusCode === 200) {
                            return RA.uContactSuccess(res.data.Data, action.onCallback)
                        } else {
                            return RA.uContactFail(res.data.Message, action.onCallback)
                        }
                    })
                    .catch(err => {
                        return RA.uContactFail(err, action.onCallback)
                    })
            }
        ))
}

/**
 * 
 * @param {ActionsObservable} action$ 
 * @param {StateObservable} state$ 
 */
const uContactSuccessEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.U_CONTACT_SUCCESS),
        switchMap(
            (action, idx) => {
                // console.log('=====>Observable RUNNING Success<=====', action, idx)
                if (action.onCallback && typeof action.onCallback == 'function') {
                    let dataCallback = { hasError: false, payload: action.payload }
                    action.onCallback(dataCallback)
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
const uContactFailEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.U_CONTACT_FAIL),
        switchMap(
            (action, idx) => {
                // console.log('=====>Observable RUNNING Fail<=====', action, idx)
                if (action.onCallback && typeof action.onCallback == 'function') {
                    let dataCallback = { hasError: true, payload: action.payload }
                    action.onCallback(dataCallback)
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
const dContactEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.D_CONTACT),
        mergeMap(
            (action, idx) => {
                let data = action.payload
                let url = `${RC.API_CONTACT}/${data.Id}`
                return Axios.delete(url, data)
                    .then(res => {
                        if (res && res.data && res.data.StatusCode === 200) {
                            return RA.dContactSuccess(res.data.Data, action.onCallback)
                        } else {
                            return RA.dContactFail(res.data.Message, action.onCallback)
                        }
                    })
                    .catch(err => {
                        return RA.dContactFail(err, action.onCallback)
                    })
            }
        ))
}

/**
 * 
 * @param {ActionsObservable} action$ 
 * @param {StateObservable} state$ 
 */
const dContactSuccessEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.D_CONTACT_SUCCESS),
        switchMap(
            (action, idx) => {
                // console.log('=====>Observable RUNNING Success<=====', action, idx)
                if (action.onCallback && typeof action.onCallback == 'function') {
                    let dataCallback = { hasError: false, payload: action.payload }
                    action.onCallback(dataCallback)
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
const dContactFailEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.D_CONTACT_FAIL),
        switchMap(
            (action, idx) => {
                // console.log('=====>Observable RUNNING Fail<=====', action, idx)
                if (action.onCallback && typeof action.onCallback == 'function') {
                    let dataCallback = { hasError: true, payload: action.payload }
                    action.onCallback(dataCallback)
                }
                return EMPTY
            }
        )
    )
}

const contactEpics = [
    fetchContactEpics,
    fetchContactSuccessEpics,
    fetchContactFailEpics,
    cContactEpics,
    cContactSuccessEpics,
    cContactFailEpics,
    uContactEpics,
    uContactSuccessEpics,
    uContactFailEpics,
    dContactEpics,
    dContactSuccessEpics,
    dContactFailEpics,
]

export default contactEpics
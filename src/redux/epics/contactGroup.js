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
const fetchContactGroupEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.FETCH_CONTACT_GROUP),
        mergeMap(
            (action, idx) => {
                let data = action.payload
                data.pageindex = data.pageindex - 1
                let url = RC.API_CONTACT_GROUP + "?" + queryString.stringify(data)
                console.log(url, data)
                return Axios.get(url, data)
                    .then(res => {
                        console.log("call fetchContactGroupEpics good", res)
                        if (res && res.data && res.data.StatusCode === 200) {
                            return RA.fetchContactGroupSuccess(res.data.Data, action.onCallback)
                        } else {
                            return RA.fetchContactGroupFail(res.data.Message, action.onCallback)
                        }
                    })
                    .catch(err => {
                        console.log("call fetchContactGroupEpics fail", err)
                        return RA.fetchContactGroupFail(err, action.onCallback)
                    })
            }
        ))
}
/**
 * 
 * @param {ActionsObservable} action$ 
 * @param {StateObservable} state$ 
 */
const fetchContactGroupSuccessEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.FETCH_CONTACT_GROUP_SUCCESS),
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
const fetchContactGroupFailEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.FETCH_CONTACT_GROUP_FAIL),
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
const cContactGroupEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.C_CONTACT_GROUP),
        mergeMap(
            (action, idx) => {
                let data = action.payload
                let url = RC.API_CONTACT_GROUP
                console.log(url, data)
                return Axios.post(url, data)
                    .then(res => {
                        if (res && res.data && res.data.StatusCode === 200) {
                            return RA.cContactGroupSuccess(res.data.Data, action.onCallback)
                        } else {
                            return RA.cContactGroupFail(res.data.Message, action.onCallback)
                        }
                    })
                    .catch(err => {
                        return RA.cContactGroupFail(err, action.onCallback)
                    })
            }
        ))
}

/**
 * 
 * @param {ActionsObservable} action$ 
 * @param {StateObservable} state$ 
 */
const cContactGroupSuccessEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.C_CONTACT_GROUP_SUCCESS),
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
const cContactGroupFailEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.C_CONTACT_GROUP_FAIL),
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
const uContactGroupEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.U_CONTACT_GROUP),
        mergeMap(
            (action, idx) => {
                let data = action.payload
                let url = `${RC.API_CONTACT_GROUP}/${data.Id} `
                return Axios.put(url, data)
                    .then(res => {
                        if (res && res.data && res.data.StatusCode === 200) {
                            return RA.uContactGroupSuccess(res.data.Data, action.onCallback)
                        } else {
                            return RA.uContactGroupFail(res.data.Message, action.onCallback)
                        }
                    })
                    .catch(err => {
                        return RA.uContactGroupFail(err, action.onCallback)
                    })
            }
        ))
}

/**
 * 
 * @param {ActionsObservable} action$ 
 * @param {StateObservable} state$ 
 */
const uContactGroupSuccessEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.U_CONTACT_GROUP_SUCCESS),
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
const uContactGroupFailEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.U_CONTACT_GROUP_FAIL),
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
const dContactGroupEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.D_CONTACT_GROUP),
        mergeMap(
            (action, idx) => {
                let data = action.payload
                let url = `${RC.API_CONTACT_GROUP}/${data.Id}`
                return Axios.delete(url, data)
                    .then(res => {
                        if (res && res.data && res.data.StatusCode === 200) {
                            return RA.dContactGroupSuccess(res.data.Data, action.onCallback)
                        } else {
                            return RA.dContactGroupFail(res.data.Message, action.onCallback)
                        }
                    })
                    .catch(err => {
                        return RA.dContactGroupFail(err, action.onCallback)
                    })
            }
        ))
}

/**
 * 
 * @param {ActionsObservable} action$ 
 * @param {StateObservable} state$ 
 */
const dContactGroupSuccessEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.D_CONTACT_SUCCESS_GROUP),
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
const dContactGroupFailEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.D_CONTACT_FAIL_GROUP),
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

const contactGroupEpics = [
    fetchContactGroupEpics,
    fetchContactGroupSuccessEpics,
    fetchContactGroupFailEpics,
    cContactGroupEpics,
    cContactGroupSuccessEpics,
    cContactGroupFailEpics,
    uContactGroupEpics,
    uContactGroupSuccessEpics,
    uContactGroupFailEpics,
    dContactGroupEpics,
    dContactGroupSuccessEpics,
    dContactGroupFailEpics,
]

export default contactGroupEpics
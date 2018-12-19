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
const fetchMailTemplateEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.FETCH_MAIL_TEMPLATE),
        mergeMap(
            (action, idx) => {
                let data = action.payload
                data.pageindex = data.pageindex - 1
                let url = RC.API_MAIL_TEMPLATE + "?" + queryString.stringify(data)
                console.log(url)
                return Axios.get(url, data)
                    .then(res => {
                        console.log("call fetchMailTemplateEpics good", res)
                        if (res && res.data && res.data.StatusCode === 200) {
                            return RA.fetchMailTemplateSuccess(res.data.Data, action.onCallback)
                        } else {
                            return RA.fetchMailTemplateFail(res.data.Message, action.onCallback)
                        }
                    })
                    .catch(err => {
                        console.log("call fetchMailTemplateEpics fail", err)
                        return RA.fetchMailTemplateFail(err, action.onCallback)
                    })
            }
        ))
}
/**
 * 
 * @param {ActionsObservable} action$ 
 * @param {StateObservable} state$ 
 */
const fetchMailTemplateSuccessEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.FETCH_MAIL_TEMPLATE_SUCCESS),
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
const fetchMailTemplateFailEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.FETCH_MAIL_TEMPLATE_FAIL),
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
const cMailTemplateEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.C_MAIL_TEMPLATE),
        mergeMap(
            (action, idx) => {
                let data = action.payload
                let url = RC.API_MAIL_TEMPLATE
                return Axios.post(url, data)
                    .then(res => {
                        if (res && res.data && res.data.StatusCode === 200) {
                            return RA.cMailTemplateSuccess(res.data.Data, action.onCallback)
                        } else {
                            return RA.cMailTemplateFail(res.data.Message, action.onCallback)
                        }
                    })
                    .catch(err => {
                        return RA.cMailTemplateFail(err, action.onCallback)
                    })
            }
        ))
}

/**
 * 
 * @param {ActionsObservable} action$ 
 * @param {StateObservable} state$ 
 */
const cMailTemplateSuccessEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.C_MAIL_TEMPLATE_SUCCESS),
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
const cMailTemplateFailEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.C_MAIL_TEMPLATE_FAIL),
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
const uMailTemplateEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.U_MAIL_TEMPLATE),
        mergeMap(
            (action, idx) => {
                let data = action.payload
                let url = `${RC.API_MAIL_TEMPLATE}/${data.Id} `
                return Axios.put(url, data)
                    .then(res => {
                        if (res && res.data && res.data.StatusCode === 200) {
                            return RA.uMailTemplateSuccess(res.data.Data, action.onCallback)
                        } else {
                            return RA.uMailTemplateFail(res.data.Message, action.onCallback)
                        }
                    })
                    .catch(err => {
                        return RA.uMailTemplateFail(err, action.onCallback)
                    })
            }
        ))
}

/**
 * 
 * @param {ActionsObservable} action$ 
 * @param {StateObservable} state$ 
 */
const uMailTemplateSuccessEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.U_MAIL_TEMPLATE_SUCCESS),
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
const uMailTemplateFailEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.U_MAIL_TEMPLATE_FAIL),
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
const dMailTemplateEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.D_MAIL_TEMPLATE),
        mergeMap(
            (action, idx) => {
                let data = action.payload
                let url = `${RC.API_MAIL_TEMPLATE}/${data.Id}`
                return Axios.delete(url, data)
                    .then(res => {
                        if (res && res.data && res.data.StatusCode === 200) {
                            return RA.dMailTemplateSuccess(res.data.Data, action.onCallback)
                        } else {
                            return RA.dMailTemplateFail(res.data.Message, action.onCallback)
                        }
                    })
                    .catch(err => {
                        return RA.dMailTemplateFail(err, action.onCallback)
                    })
            }
        ))
}

/**
 * 
 * @param {ActionsObservable} action$ 
 * @param {StateObservable} state$ 
 */
const dMailTemplateSuccessEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.D_MAIL_TEMPLATE_SUCCESS),
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
const dMailTemplateFailEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.D_MAIL_TEMPLATE_FAIL),
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

const mailTemplateEpics = [
    fetchMailTemplateEpics,
    fetchMailTemplateSuccessEpics,
    fetchMailTemplateFailEpics,
    cMailTemplateEpics,
    cMailTemplateSuccessEpics,
    cMailTemplateFailEpics,
    uMailTemplateEpics,
    uMailTemplateSuccessEpics,
    uMailTemplateFailEpics,
    dMailTemplateEpics,
    dMailTemplateSuccessEpics,
    dMailTemplateFailEpics,
]

export default mailTemplateEpics
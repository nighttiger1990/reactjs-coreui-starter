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
const fetchCampaignEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.FETCH_CAMPAIGN),
        mergeMap(
            (action, idx) => {
                let data = action.payload
                data.pageindex = data.pageindex - 1
                let url = RC.API_CAMPAIGN + "?" + queryString.stringify(data)
                console.log(url)
                return Axios.get(url, data)
                    .then(res => {
                        console.log("call fetchCampaignEpics good", res)
                        if (res && res.data && res.data.StatusCode === 200) {
                            return RA.fetchCampaignSuccess(res.data.Data, action.onCallback)
                        } else {
                            return RA.fetchCampaignFail(res.data.Message, action.onCallback)
                        }
                    })
                    .catch(err => {
                        console.log("call fetchCampaignEpics fail", err)
                        return RA.fetchCampaignFail(err, action.onCallback)
                    })
            }
        ))
}
/**
 * 
 * @param {ActionsObservable} action$ 
 * @param {StateObservable} state$ 
 */
const fetchCampaignSuccessEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.FETCH_CAMPAIGN_SUCCESS),
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
const fetchCampaignFailEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.FETCH_CAMPAIGN_FAIL),
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
const cCampaignEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.C_CAMPAIGN),
        mergeMap(
            (action, idx) => {
                let data = action.payload
                let url = RC.API_CAMPAIGN
                return Axios.post(url, data)
                    .then(res => {
                        if (res && res.data && res.data.StatusCode === 200) {
                            return RA.cCampaignSuccess(res.data.Data, action.onCallback)
                        } else {
                            return RA.cCampaignFail(res.data.Message, action.onCallback)
                        }
                    })
                    .catch(err => {
                        return RA.cCampaignFail(err, action.onCallback)
                    })
            }
        ))
}

/**
 * 
 * @param {ActionsObservable} action$ 
 * @param {StateObservable} state$ 
 */
const cCampaignSuccessEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.C_CAMPAIGN_SUCCESS),
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
const cCampaignFailEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.C_CAMPAIGN_FAIL),
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
const uCampaignEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.U_CAMPAIGN),
        mergeMap(
            (action, idx) => {
                let data = action.payload
                let url = `${RC.API_CAMPAIGN}/${data.Id} `
                return Axios.put(url, data)
                    .then(res => {
                        if (res && res.data && res.data.StatusCode === 200) {
                            return RA.uCampaignSuccess(res.data.Data, action.onCallback)
                        } else {
                            return RA.uCampaignFail(res.data.Message, action.onCallback)
                        }
                    })
                    .catch(err => {
                        return RA.uCampaignFail(err, action.onCallback)
                    })
            }
        ))
}

/**
 * 
 * @param {ActionsObservable} action$ 
 * @param {StateObservable} state$ 
 */
const uCampaignSuccessEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.U_CAMPAIGN_SUCCESS),
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
const uCampaignFailEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.U_CAMPAIGN_FAIL),
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
const dCampaignEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.D_CAMPAIGN),
        mergeMap(
            (action, idx) => {
                let data = action.payload
                let url = `${RC.API_CAMPAIGN}/${data.Id}`
                return Axios.delete(url, data)
                    .then(res => {
                        if (res && res.data && res.data.StatusCode === 200) {
                            return RA.dCampaignSuccess(res.data.Data, action.onCallback)
                        } else {
                            return RA.dCampaignFail(res.data.Message, action.onCallback)
                        }
                    })
                    .catch(err => {
                        return RA.dCampaignFail(err, action.onCallback)
                    })
            }
        ))
}

/**
 * 
 * @param {ActionsObservable} action$ 
 * @param {StateObservable} state$ 
 */
const dCampaignSuccessEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.D_CAMPAIGN_SUCCESS),
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
const dCampaignFailEpics = (action$, state$) => {
    return action$.pipe(
        ofType(RT.D_CAMPAIGN_FAIL),
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
    fetchCampaignEpics,
    fetchCampaignSuccessEpics,
    fetchCampaignFailEpics,
    cCampaignEpics,
    cCampaignSuccessEpics,
    cCampaignFailEpics,
    uCampaignEpics,
    uCampaignSuccessEpics,
    uCampaignFailEpics,
    dCampaignEpics,
    dCampaignSuccessEpics,
    dCampaignFailEpics,
]

export default contactEpics
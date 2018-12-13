// eslint-disable-next-line
import Axios from "axios";
// import { Observable } from 'rxjs'
// eslint-disable-next-line
import { ActionsObservable, StateObservable, ofType } from 'redux-observable'
// eslint-disable-next-line
import { mergeMap, concatMap, flatMap, switchMap } from 'rxjs/operators'
// eslint-disable-next-line
import RA from '../actions'
import RT from "../types";
// eslint-disable-next-line
import { of, from, NEVER, EMPTY } from "rxjs";

/**
 * 
 * @param {ActionsObservable} action$ 
 * @param {StateObservable} state$ 
 */
const sendMail = (action$, state$) => {
    // console.warn("checkAuthEpics====> RUNNING\n", state$)
    return action$.pipe(
        ofType(RT.SEND_MAIL),
        mergeMap(
            (action, idx) => {
                // console.log('=====>Observable RUNNING<=====', action, idx)
                // let url = "http://42.115.221.35:9091/login"
                // return Axios.post(url, { username: "truongbl", passsword: "123" })
                //     .then(res => {
                //         if (res && res.data && res.data.status === 1) {
                //             return RA.setUserSuccess(res.data.data, action.onCallback)
                //         } else {
                //             return RA.setUserFail(res.data.message, action.onCallback)
                //         }
                //     })
                //     .catch(err => {
                //         return RA.setUserFail(err, action.onCallback)
                //     })
                return [
                    {type: RT.SEND_MAIL_SUCCESS, payload: action.payload, onCallback: action.onCallback},
                    {type: "REDIRECT_ONE"},
                    {type: "REDIRECT_TWO"}
                ]
            }
        ))
}
/**
 * 
 * @param {ActionsObservable} action$ 
 * @param {StateObservable} state$ 
 */
const sendMailSuccess = (action$, state$) => {
    // console.warn('setUserSuccessEpics\n', state$)
    return action$.pipe(
        ofType(RT.SEND_MAIL_SUCCESS),
        switchMap(
            (action, idx) => {
                console.log('===> SEND MAIL SUCCESS EPICS', action)
                
                return EMPTY
            }
        )
    )
}
// const sendMailFail = (action$, state$) => {
//     console.warn('setUserFailEpics\n', state$)
//     return action$.pipe(
//         ofType(RT.CHECK_AUTH_FAIL),
//         switchMap(
//             (action, idx) => {
//                 // console.log('=====>Observable RUNNING Fail<=====', action, idx)
//                 if (action.onCallback && typeof action.onCallback == 'function') {
//                     action.onCallback({ hasError: true, payload: action.payload })
//                 }
//                 return EMPTY
//             }
//         )
//     )
// }

const mailEpics = [
    sendMail,
    sendMailSuccess,
    // sendMailFail
]

export default mailEpics
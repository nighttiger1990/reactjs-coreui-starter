import RT from "../types";

const checkAuth = (payload, onCallback) => {
    return {
        type: RT.CHECK_AUTH,
        payload: payload,
        onCallback
    };
}

const setUserSuccess = (user, onCallback) => {
    return {
        type: RT.CHECK_AUTH_SUCCESS,
        payload: user,
        onCallback
    };
}

const setUserFail = (error, onCallback) => {
    return {
        type: RT.CHECK_AUTH_FAIL,
        payload: error,
        onCallback
    }
}

const signOut = (onCallback) => {
    return {
        type: RT.SIGN_OUT,
        onCallback
    }
}

const AUTH_ACTIONS = {
    checkAuth,
    setUserSuccess,
    setUserFail,
    signOut
}

export default AUTH_ACTIONS


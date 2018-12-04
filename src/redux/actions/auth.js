import RT from "../types";


function checkAuth(payload) {
    return {
        type: RT.CHECK_AUTH,
        payload: payload
    };
}

function setUserSuccess(user) {
    return {
        type: RT.CHECK_AUTH_SUCCESS,
        payload: user
    };
}

const AUTH_ACTIONS = {
    checkAuth,
    setUserSuccess
}

export default AUTH_ACTIONS


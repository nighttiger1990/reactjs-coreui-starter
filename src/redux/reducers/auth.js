import RT from "../types";


const initialState = {
    isLoading: false,
    userInfo: null,
    error: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case RT.CHECK_AUTH_SUCCESS:
            return setUser(state, action)
        default:
            break
    }
    return state
}

function setUser(state, action) {
    let { payload: userInfo } = action
    return { ...state, userInfo: userInfo }
}
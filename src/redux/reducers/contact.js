import RT from "../types";


const initialState = {
    isLoading: false,
    contacts: [],
    error: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case RT.C_CONTACT_FAIL:
        case RT.FETCH_CONTACT:
            return { ...state, isLoading: true, error: null }
        case RT.FETCH_CONTACT_SUCCESS:
            return { ...state, isLoading: false, contacts: action.payload }
        case RT.FETCH_CONTACT_FAIL:
            return { ...state, isLoading: false, error: action.payload }
        default:
            break
    }
    return state
}
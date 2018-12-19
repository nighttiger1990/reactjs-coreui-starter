import RT from "../types";


const initialState = {
    isLoading: false,
    contactInfo: {},
    error: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case RT.FETCH_CONTACT:
            return { ...state, isLoading: true, error: null }
        case RT.FETCH_CONTACT_SUCCESS:
            return { ...state, isLoading: false, contactInfo: action.payload }
        case RT.FETCH_CONTACT_FAIL:
            return { ...state, isLoading: false, error: action.payload }
        default:
            break
    }
    return state
}
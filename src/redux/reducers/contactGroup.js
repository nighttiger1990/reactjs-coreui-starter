import RT from "../types";


const initialState = {
    isLoading: false,
    contactGroups: {},
    error: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case RT.FETCH_CONTACT_GROUP:
            return { ...state, isLoading: true, error: null }
        case RT.FETCH_CONTACT_GROUP_SUCCESS:
            return { ...state, isLoading: false, contactGroups: action.payload }
        case RT.FETCH_CONTACT_GROUP_FAIL:
            return { ...state, isLoading: false, error: action.payload }
        default:
            break
    }
    return state
}
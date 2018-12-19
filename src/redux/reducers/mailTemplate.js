import RT from "../types";


const initialState = {
    isLoading: false,
    mailTemplateInfo: {},
    error: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case RT.FETCH_MAIL_TEMPLATE:
            return { ...state, isLoading: true, error: null }
        case RT.FETCH_MAIL_TEMPLATE_SUCCESS:
            return { ...state, isLoading: false, mailTemplateInfo: action.payload }
        case RT.FETCH_MAIL_TEMPLATE_FAIL:
            return { ...state, isLoading: false, error: action.payload }
        default:
            break
    }
    return state
}
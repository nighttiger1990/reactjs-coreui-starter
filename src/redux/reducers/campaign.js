import RT from "../types";


const initialState = {
    isLoading: false,
    campaignInfo: {},
    error: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case RT.FETCH_CAMPAIGN:
            return { ...state, isLoading: true, error: null }
        case RT.FETCH_CAMPAIGN_SUCCESS:
            return { ...state, isLoading: false, campaignInfo: action.payload }
        case RT.FETCH_CAMPAIGN_FAIL:
            return { ...state, isLoading: false, error: action.payload }
        default:
            break
    }
    return state
}
import RT from "../types";

const fetchCampaign = (body, onCallback) => {
    return {
        type: RT.FETCH_CAMPAIGN,
        payload: body,
        onCallback
    };
}

const fetchCampaignSuccess = (user, onCallback) => {
    return {
        type: RT.FETCH_CAMPAIGN_SUCCESS,
        payload: user,
        onCallback
    };
}

const fetchCampaignFail = (error, onCallback) => {
    return {
        type: RT.FETCH_CAMPAIGN_FAIL,
        payload: error,
        onCallback
    }
}

const cCampaign = (body, onCallback) => {
    return {
        type: RT.C_CAMPAIGN,
        payload: body,
        onCallback
    };
}

const cCampaignSuccess = (user, onCallback) => {
    return {
        type: RT.C_CAMPAIGN_SUCCESS,
        payload: user,
        onCallback
    };
}

const cCampaignFail = (error, onCallback) => {
    return {
        type: RT.C_CAMPAIGN_FAIL,
        payload: error,
        onCallback
    }
}
const uCampaign = (body, onCallback) => {
    return {
        type: RT.U_CAMPAIGN,
        payload: body,
        onCallback
    };
}

const uCampaignSuccess = (user, onCallback) => {
    return {
        type: RT.U_CAMPAIGN_SUCCESS,
        payload: user,
        onCallback
    };
}

const uCampaignFail = (error, onCallback) => {
    return {
        type: RT.U_CAMPAIGN_FAIL,
        payload: error,
        onCallback
    }
}

const dCampaign = (body, onCallback) => {
    return {
        type: RT.D_CAMPAIGN,
        payload: body,
        onCallback
    };
}

const dCampaignSuccess = (user, onCallback) => {
    return {
        type: RT.D_CAMPAIGN_SUCCESS,
        payload: user,
        onCallback
    };
}

const dCampaignFail = (error, onCallback) => {
    return {
        type: RT.D_CAMPAIGN_FAIL,
        payload: error,
        onCallback
    }
}

const CAMPAIGN_ACTIONS = {
    fetchCampaign,
    fetchCampaignSuccess,
    fetchCampaignFail,
    cCampaign,
    cCampaignSuccess,
    cCampaignFail,
    uCampaign,
    uCampaignSuccess,
    uCampaignFail,
    dCampaign,
    dCampaignSuccess,
    dCampaignFail
}

export default CAMPAIGN_ACTIONS


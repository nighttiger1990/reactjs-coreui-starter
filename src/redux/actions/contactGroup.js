import RT from "../types";

const fetchContactGroup = (body, onCallback) => {
    return {
        type: RT.FETCH_CONTACT_GROUP,
        payload: body,
        onCallback
    };
}

const fetchContactGroupSuccess = (user, onCallback) => {
    return {
        type: RT.FETCH_CONTACT_GROUP_SUCCESS,
        payload: user,
        onCallback
    };
}

const fetchContactGroupFail = (error, onCallback) => {
    return {
        type: RT.FETCH_CONTACT_GROUP_FAIL,
        payload: error,
        onCallback
    }
}

const cContactGroup = (body, onCallback) => {
    return {
        type: RT.C_CONTACT_GROUP,
        payload: body,
        onCallback
    };
}

const cContactGroupSuccess = (user, onCallback) => {
    return {
        type: RT.C_CONTACT_GROUP_SUCCESS,
        payload: user,
        onCallback
    };
}

const cContactGroupFail = (error, onCallback) => {
    return {
        type: RT.C_CONTACT_GROUP_FAIL,
        payload: error,
        onCallback
    }
}
const uContactGroup = (body, onCallback) => {
    return {
        type: RT.U_CONTACT_GROUP,
        payload: body,
        onCallback
    };
}

const uContactGroupSuccess = (user, onCallback) => {
    return {
        type: RT.U_CONTACT_GROUP_SUCCESS,
        payload: user,
        onCallback
    };
}

const uContactGroupFail = (error, onCallback) => {
    return {
        type: RT.U_CONTACT_GROUP_FAIL,
        payload: error,
        onCallback
    }
}

const dContactGroup = (body, onCallback) => {
    return {
        type: RT.D_CONTACT_GROUP,
        payload: body,
        onCallback
    };
}

const dContactGroupSuccess = (user, onCallback) => {
    return {
        type: RT.D_CONTACT_GROUP_SUCCESS,
        payload: user,
        onCallback
    };
}

const dContactGroupFail = (error, onCallback) => {
    return {
        type: RT.D_CONTACT_GROUP_FAIL,
        payload: error,
        onCallback
    }
}

const CONTACT_GROUP_ACTIONS = {
    fetchContactGroup,
    fetchContactGroupSuccess,
    fetchContactGroupFail,
    cContactGroup,
    cContactGroupSuccess,
    cContactGroupFail,
    uContactGroup,
    uContactGroupSuccess,
    uContactGroupFail,
    dContactGroup,
    dContactGroupSuccess,
    dContactGroupFail
}

export default CONTACT_GROUP_ACTIONS


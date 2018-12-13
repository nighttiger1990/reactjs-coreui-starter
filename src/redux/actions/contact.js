import RT from "../types";

const fetchContact = (body, onCallback) => {
    return {
        type: RT.FETCH_CONTACT,
        payload: body,
        onCallback
    };
}

const fetchContactSuccess = (user, onCallback) => {
    return {
        type: RT.FETCH_CONTACT_SUCCESS,
        payload: user,
        onCallback
    };
}

const fetchContactFail = (error, onCallback) => {
    return {
        type: RT.FETCH_CONTACT_FAIL,
        payload: error,
        onCallback
    }
}

const cContact = (body, onCallback) => {
    return {
        type: RT.C_CONTACT,
        payload: body,
        onCallback
    };
}

const cContactSuccess = (user, onCallback) => {
    return {
        type: RT.C_CONTACT_SUCCESS,
        payload: user,
        onCallback
    };
}

const cContactFail = (error, onCallback) => {
    return {
        type: RT.C_CONTACT_FAIL,
        payload: error,
        onCallback
    }
}
const CONTACT_ACTIONS = {
    fetchContact,
    fetchContactSuccess,
    fetchContactFail,
    cContact,
    cContactSuccess,
    cContactFail
}

export default CONTACT_ACTIONS


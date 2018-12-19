import RT from "../types";

const fetchMailTemplate = (body, onCallback) => {
    return {
        type: RT.FETCH_MAIL_TEMPLATE,
        payload: body,
        onCallback
    };
}

const fetchMailTemplateSuccess = (user, onCallback) => {
    return {
        type: RT.FETCH_MAIL_TEMPLATE_SUCCESS,
        payload: user,
        onCallback
    };
}

const fetchMailTemplateFail = (error, onCallback) => {
    return {
        type: RT.FETCH_MAIL_TEMPLATE_FAIL,
        payload: error,
        onCallback
    }
}

const cMailTemplate = (body, onCallback) => {
    return {
        type: RT.C_MAIL_TEMPLATE,
        payload: body,
        onCallback
    };
}

const cMailTemplateSuccess = (user, onCallback) => {
    return {
        type: RT.C_MAIL_TEMPLATE_SUCCESS,
        payload: user,
        onCallback
    };
}

const cMailTemplateFail = (error, onCallback) => {
    return {
        type: RT.C_MAIL_TEMPLATE_FAIL,
        payload: error,
        onCallback
    }
}
const uMailTemplate = (body, onCallback) => {
    return {
        type: RT.U_MAIL_TEMPLATE,
        payload: body,
        onCallback
    };
}

const uMailTemplateSuccess = (user, onCallback) => {
    return {
        type: RT.U_MAIL_TEMPLATE_SUCCESS,
        payload: user,
        onCallback
    };
}

const uMailTemplateFail = (error, onCallback) => {
    return {
        type: RT.U_MAIL_TEMPLATE_FAIL,
        payload: error,
        onCallback
    }
}

const dMailTemplate = (body, onCallback) => {
    return {
        type: RT.D_MAIL_TEMPLATE,
        payload: body,
        onCallback
    };
}

const dMailTemplateSuccess = (user, onCallback) => {
    return {
        type: RT.D_MAIL_TEMPLATE_SUCCESS,
        payload: user,
        onCallback
    };
}

const dMailTemplateFail = (error, onCallback) => {
    return {
        type: RT.D_MAIL_TEMPLATE_FAIL,
        payload: error,
        onCallback
    }
}

const MAIL_TEMPLATE_ACTIONS = {
    fetchMailTemplate,
    fetchMailTemplateSuccess,
    fetchMailTemplateFail,
    cMailTemplate,
    cMailTemplateSuccess,
    cMailTemplateFail,
    uMailTemplate,
    uMailTemplateSuccess,
    uMailTemplateFail,
    dMailTemplate,
    dMailTemplateSuccess,
    dMailTemplateFail
}

export default MAIL_TEMPLATE_ACTIONS


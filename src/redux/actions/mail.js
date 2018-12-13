import RT from "../types";

const sendMail = (payload, onCallback) => {
    return {
        type: RT.SEND_MAIL,
        payload: payload,
        onCallback
    };
}


const MAIL_ACTIONS = {
    sendMail,

}

export default MAIL_ACTIONS


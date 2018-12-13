import AUTH_ACTIONS from "./auth"
import MAIL_ACTIONS from "./mail";
import CONTACT_ACTIONS from "./contact";

const RA = {
    ...AUTH_ACTIONS,
    ...MAIL_ACTIONS,
    ...CONTACT_ACTIONS
}

export default RA
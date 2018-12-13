import AUTH_TYPES from "./auth";
import MAIL_TYPES from "./mail";
import CONTACT_TYPES from "./contact";

/**
 * RT mean Root types
 */
const RT = {
    ...AUTH_TYPES,
    ...MAIL_TYPES,
    ...CONTACT_TYPES
}

export default RT
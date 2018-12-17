import AUTH_TYPES from "./auth";
import MAIL_TYPES from "./mail";
import CONTACT_TYPES from "./contact";
import CONTACT_GROUP_TYPES from "./contactGroup";

/**
 * RT mean Root types
 */
const RT = {
    ...AUTH_TYPES,
    ...MAIL_TYPES,
    ...CONTACT_TYPES,
    ...CONTACT_GROUP_TYPES
}

export default RT
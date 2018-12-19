import AUTH_TYPES from "./auth";
import MAIL_TYPES from "./mail";
import CONTACT_TYPES from "./contact";
import CONTACT_GROUP_TYPES from "./contactGroup";
import CAMPAIGN_TYPES from "./campaign";
import MAIL_TEMPLATE_TYPES from "./mailTemplate";

/**
 * RT mean Root types
 */
const RT = {
    ...AUTH_TYPES,
    ...MAIL_TYPES,
    ...CONTACT_TYPES,
    ...CONTACT_GROUP_TYPES,
    ...CAMPAIGN_TYPES,
    ...MAIL_TEMPLATE_TYPES
}

export default RT
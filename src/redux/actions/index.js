import AUTH_ACTIONS from "./auth"
import MAIL_ACTIONS from "./mail";
import CONTACT_ACTIONS from "./contact";
import CONTACT_GROUP_ACTIONS from "./contactGroup";
import CAMPAIGN_ACTIONS from "./campaign";
import MAIL_TEMPLATE_ACTIONS from "./mailTemplate";

const RA = {
    ...AUTH_ACTIONS,
    ...MAIL_ACTIONS,
    ...CONTACT_ACTIONS,
    ...CONTACT_GROUP_ACTIONS,
    ...CAMPAIGN_ACTIONS,
    ...MAIL_TEMPLATE_ACTIONS
}

export default RA
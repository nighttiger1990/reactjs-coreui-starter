import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';

const Dashboard = React.lazy(() => import('../view/Dashboard'))
const MailTemplate = React.lazy(() => import('../view/MailTemplate'))
const MailCampaign = React.lazy(() => import('../view/MailCampaign'))
const MailSender = React.lazy(() => import('../view/MailSender'))
const ContactList = React.lazy(() => import('../view/ContactList'))
const ContactCreate = React.lazy(() => import('../view/ContactCreate'))
const ContactUpdate = React.lazy(() => import('../view/ContactUpdate'))
const ContactGroupList = React.lazy(() => import('../view/ContactGroupList'))
const ContactGroupCreate = React.lazy(() => import('../view/ContactGroupCreate'))
const CampaignList = React.lazy(() => import('../view/CampaignList'))
const CampaignCreate = React.lazy(() => import('../view/CampaignCreate'))
const MailTemplateList = React.lazy(() => import('../view/MailTemplateList'))
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/mailtemplate', name: "Mail template", component: MailTemplate },
  { path: '/mailcampaign', name: "Mail campaign", component: MailCampaign },
  { path: '/mailsender', name: "Mail sender", component: MailSender },
  { path: '/contactlist', name: "Contact list", component: ContactList },
  { path: '/contactcreate', name: "Contact create", component: ContactCreate },
  { path: '/contactupdate', name: "Contact update", component: ContactUpdate },
  { path: '/contactgrouplist', name: "Contact group list", component: ContactGroupList },
  { path: '/contactgroupcreate', name: "Contact group create", component: ContactGroupCreate },
  { path: '/campaignlist', name: "Campaign list", component: CampaignList },
  { path: '/campaigncreate', name: "Campaign create", component: CampaignCreate },
  { path: '/mailtemplatelist', name: "Mail template list", component: MailTemplateList },
];

export default routes;

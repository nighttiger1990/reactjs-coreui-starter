import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';

const Dashboard = React.lazy(() => import('../view/Dashboard'))
const MailTemplate = React.lazy(() => import('../view/MailTemplate'))
const MailCampaign = React.lazy(() => import('../view/MailCampaign'))
const MailSender = React.lazy(() => import('../view/MailSender'))
const ContactList = React.lazy(() => import('../view/ContactList'))
const ContactCreate = React.lazy(() => import('../view/ContactCreate'))
const ContactUpdate = React.lazy(()=>import('../view/ContactUpdate'))
const ContactGroupCreate = React.lazy(() => import('../view/ContactGroupCreate'))
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
  { path: '/contactgroupcreate', name: "Contact group create", component: ContactGroupCreate },
];

export default routes;

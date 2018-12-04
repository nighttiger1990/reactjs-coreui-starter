import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';

const Dashboard = React.lazy(() => import('../view/Dashboard'));
const MailEditor = React.lazy(() => import('../view/MailEditor'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/sendmail', name: "Send mail", component:  MailEditor }
];

export default routes;

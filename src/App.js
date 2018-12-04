import React, { Component } from 'react';
import './App.css';
import MailEditor from './view/MailEditor';
import { HashRouter, Switch, Route } from 'react-router-dom'
import Login from './view/Login';
import Register from './view/Register';
import Page404 from './view/Page404';
import Page500 from './view/Page500';
import DefaultLayout from './layout/DefaultLayout';

import './App.scss';
class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/mail" name="Mail Editor" component={MailEditor} />
                    <Route exact path="/login" name="Login Page" component={Login} />
                    <Route exact path="/register" name="Register Page" component={Register} />
                    <Route exact path="/404" name="Page 404" component={Page404} />
                    <Route exact path="/500" name="Page 500" component={Page500} />
                    <Route path="/" name="Home" component={DefaultLayout} />
                </Switch>
            </HashRouter>
        );
    }
}

export default App;

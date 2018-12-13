import React, { Component } from 'react';
import { BrowserRouter as AppRouter, Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import './App.scss';
import './App.css';
import { Provider } from 'react-redux'
import configureStore from './redux/store';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
    loader: () => import('./layout/DefaultLayout'),
    loading
});

// Pages
const Login = Loadable({
    loader: () => import('./view/Login'),
    loading
});

const Register = Loadable({
    loader: () => import('./view/Register'),
    loading
});

const Page404 = Loadable({
    loader: () => import('./view/Page404'),
    loading
});

const Page500 = Loadable({
    loader: () => import('./view/Page500'),
    loading
});

const MailTemplate = Loadable({
    loader: () => import('./view/MailTemplate'),
    loading
})
class App extends Component {
    constructor(props) {
        super(props)
        const store = configureStore()
        const pStore = persistStore(store, null, this.persistRehydrateCallback)
        this.state = {
            store: store,
            pStore: pStore
        }
    }
    persistRehydrateCallback = () => {
        /**
         * @type {{auth: {isCheckingAuth: Boolean, signedInfo: Object, err: Object, tokenNotif: String}}}
         */
        let rootState = this.state.store.getState()
        console.log("======RehydrateCallback======", rootState)

    }
    render() {
        return (
            <Provider store={this.state.store}>
                <PersistGate persistor={this.state.pStore} loading={loading()}>
                    <AppRouter>
                        <Switch>
                            <Route exact path="/mail" name="Mail Editor" component={MailTemplate} />
                            <Route exact path="/login" name="Login Page" component={Login} />
                            <Route exact path="/register" name="Register Page" component={Register} />
                            <Route exact path="/404" name="Page 404" component={Page404} />
                            <Route exact path="/500" name="Page 500" component={Page500} />
                            <Route path="/" name="Home" component={DefaultLayout} />
                        </Switch>
                    </AppRouter>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;

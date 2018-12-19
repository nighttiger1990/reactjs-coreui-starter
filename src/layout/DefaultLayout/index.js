import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import {connect} from 'react-redux'
import {
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import RA from '../../redux/actions'

// const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  loading = <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut = (e) => {
    e.preventDefault()
    // this.props.history.push('/login')
    this.props.dispatch(RA.signOut())
  }

render() {
    let userInfo = this.props.userInfo
    if(!userInfo || Object.keys(userInfo).length === 0){
      return <Redirect to="/login"/>
    }
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading}>
            <DefaultHeader {...this.props} onLogout={this.signOut}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={navigation} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
              <Suspense fallback={this.loading}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          {/* <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside> */}
        </div>
        <AppFooter>
          <Suspense fallback={this.loading}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { userInfo } = state.auth
  return { userInfo }
}

export default connect(mapStateToProps)(DefaultLayout)

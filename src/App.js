import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuider/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Checkout/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'

class App extends Component {
  componentWillMount() {
    this.props.onAutoLogin()
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout>
            <Switch>
              <Route path='/checkout' component={Checkout} />
              <Route exact path='/orders' component={Orders} />
              <Route exact path='/Auth' component={Auth} />
              <Route exact path='/Logout' component={Logout} />
              <Route exact path='/' component={BurgerBuilder} />
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin: () => dispatch(actions.autoLogin())
  }
}

export default connect(null, mapDispatchToProps)(App)

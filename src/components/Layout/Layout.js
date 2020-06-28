import React, { Component } from 'react'
import { connect } from 'react-redux'

import Aux from '../../hoc/Auxilary'
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state = {
    sideDrawerOpenStatus: false
  }
  sideDrawerClosedHandler = () => {
    this.setState({ sideDrawerOpenStatus: false })
  }
  sideDrawerHandler = () => {
    this.setState(prevState => {
      return {
        sideDrawerOpenStatus: !prevState.sideDrawerOpenStatus
      }
    })
  }
  render() {
    return (
      <Aux>
        <Toolbar
          openStatus={this.sideDrawerHandler}
          authLogin={this.props.authLogin}
        />
        <SideDrawer
          sideDrawer={this.state.sideDrawerOpenStatus}
          open={this.sideDrawerClosedHandler}
          authLogin={this.props.authLogin}
        />
        <main className={classes.content}>{this.props.children}</main>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    authLogin: state.auth.token ? true : false
  }
}

export default connect(mapStateToProps)(Layout)

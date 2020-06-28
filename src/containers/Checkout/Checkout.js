import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import ContactData from '../Checkout/ContactData/ContactData'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {
  checkoutCancelHandler = () => {
    this.props.history.push('/')
  }
  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }
  render() {
    let summary = <Redirect to='/' />
    if (this.props.ings) {
      const redirection = this.props.purchased ? <Redirect to='/' /> : null
      summary = (
        <div>
          {redirection}
          <CheckoutSummary
            checkoutHandleCancel={this.checkoutCancelHandler}
            checkoutHandleContinue={this.checkoutContinueHandler}
            ingredients={this.props.ings}
          />
          <Route
            path={`${this.props.match.path}/contact-data`}
            component={ContactData}
          />
        </div>
      )
    }
    return summary
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.toatalPrice,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout)

import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from '../../../axios-orders'
import Order from '../../../components/Order/Order'
import withError from '../../../hoc/withError/withError'
import Spinner from '../../../components/UI/Spinner/Spinner'
import * as actions from '../../../store/actions/index'

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId)
  }
  render() {
    let content = <Spinner />
    if (!this.props.loading) {
      content = (
        <div>
          {this.props.orders.map(order => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          ))}
        </div>
      )
    }
    return content
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => {
      dispatch(actions.fetchOrders(token, userId))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(Orders, axios))

import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Aux from '../../../hoc/Auxilary'
import Input from '../../../components/UI/Input/Input'
import withError from '../../../hoc/withError/withError'
import * as actions from '../../../store/actions/index'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      pinCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          pattern: '\\d*',
          placeholder: 'Pin Code',
          minLength: '6',
          maxLength: '6'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Mail'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          option: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'fastest'
      }
    }
  }
  orderHandler = event => {
    event.preventDefault()
    const formData = {}
    for (const formElementId in this.state.orderForm) {
      formData[formElementId] = this.state.orderForm[formElementId].value
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    }
    this.props.onPurchaseBurger(order, this.props.token)
  }
  onChangeHandler = (event, id) => {
    const newOrderForm = { ...this.state.orderForm }
    const newOrderFormElement = { ...newOrderForm[id] }
    newOrderFormElement.value = event.target.value
    newOrderForm[id] = newOrderFormElement
    this.setState({ orderForm: newOrderForm })
  }
  render() {
    let formField = []
    for (const key in this.state.orderForm) {
      formField.push({ id: key, config: this.state.orderForm[key] })
    }
    let form = (
      <Aux>
        <h4>Enter The Information</h4>
        <form onSubmit={this.orderHandler} action=''>
          {formField.map(inp => (
            <Input
              elementType={inp.config.elementType}
              elementConfig={inp.config.elementConfig}
              value={inp.config.value}
              key={inp.id}
              changed={event => this.onChangeHandler(event, inp.id)}
            />
          ))}
          <Button btnType='Success'>ORDER</Button>
        </form>
      </Aux>
    )
    if (this.props.loading) form = <Spinner />
    return <div className={classes.ContactData}>{form}</div>
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseBurger: (orderData, token) => {
      dispatch(actions.purchaseBurger(orderData, token))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(ContactData, axios))

import React, { Component } from 'react'
import { connect } from 'react-redux'

import Burger from '../../components/Layout/Burger/Burger'
import Aux from '../../hoc/Auxilary'
import BuildControls from '../../components/Layout/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Layout/Burger/OrderSummary/OrderSummary'
import Backdrop from '../../components/UI/Backdrop/Backdrop'
import Spinner from '../../components/UI/Spinner/Spinner'

import axios from '../../axios-orders'
import withError from '../../hoc/withError/withError'
import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false
  }

  componentDidMount() {
    this.props.onInitIngredients()
    this.props.onInitPurchase()
  }

  // addIngredientsHandler = type => {
  //   const ingredientCount = this.props.ings[type] + 1
  //   const updatedIngredients = { ...this.props.ings }
  //   updatedIngredients[type] = ingredientCount
  //   const newPrice = this.state.totalPrice + price[type]
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: newPrice
  //   })
  //   this.isPurchasableHandler(updatedIngredients)
  // }
  // removeIngredientHandler = type => {
  //   const ingredientCount = this.props.ings[type] - 1
  //   if (ingredientCount >= 0) {
  //     const updatedIngredients = { ...this.props.ings }
  //     updatedIngredients[type] = ingredientCount
  //     const newPrice = this.state.totalPrice - price[type]
  //     this.setState({
  //       ingredients: updatedIngredients,
  //       totalPrice: newPrice
  //     })
  //     this.isPurchasableHandler(updatedIngredients)
  //   }
  // }
  isPurchasableHandler = ingredient => {
    let sum = 0,
      isPurchasable = null
    for (const key in ingredient) {
      sum += ingredient[key]
    }
    if (sum === 0) isPurchasable = true
    else isPurchasable = false
    // console.log(isPurchasable)
    return isPurchasable
    /*  const sum = Object.keys(ingredient)
      .map(igKey => {
        return ingredient[igKey]
      })
      .reduce((sm, el) => {
        return sm + el
      }, 0)
      this.setState({ purchasable: sum > 0 })
  */
  }
  isPurchasingHandler = () => {
    if (this.props.isAuth) this.setState({ purchasing: true })
    else {
      this.props.checkLogin()
      this.props.history.push('/Auth')
    }
  }
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }
  purchaseContinueHandler = () => {
    // alert('CONTINUE!!!')

    // const queryParams = []
    // for (let key in this.props.ings) {
    //   queryParams.push(
    //     `${encodeURIComponent(key)}=${encodeURIComponent(this.props.ings[key])}`
    //   )
    // }
    // queryParams.push(`${encodeURIComponent('price')}=${this.props.price}`)
    // const queryString = queryParams.join('&')
    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: `?${queryString}`
    // })

    this.props.history.push('/checkout')
  }
  render() {
    const disabledInfo = { ...this.props.ings }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null
    let burger = this.props.error ? (
      <h2
        style={{
          textAlign: 'center',
          textTransform: 'uppercase',
          fontSize: '2.5rem',
          fontWeight: '300'
        }}>
        Error Occured
      </h2>
    ) : (
      <Spinner />
    )

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            price={this.props.price}
            addIngredients={this.props.onIngredientAdd}
            removeIngredient={this.props.onIngredientRemove}
            disabled={disabledInfo}
            purchasable={this.isPurchasableHandler(this.props.ings)}
            purchasing={this.isPurchasingHandler}
          />
        </Aux>
      )
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.props.price}
        />
      )
    }
    return (
      <Aux>
        <Backdrop
          show={this.state.purchasing}
          click={this.purchaseCancelHandler}
        />
        <Modal show={this.state.purchasing}>{orderSummary}</Modal>
        {burger}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null ? true : false
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdd: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemove: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    checkLogin: () => dispatch(actions.checkLogin())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(BurgerBuilder, axios))

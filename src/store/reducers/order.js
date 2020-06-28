import * as actionTypes from '../actions/actionsTypes'

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS: {
      const newOrder = {
        ...action.orderData,
        id: action.id
      }
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true
      }
    }
    case actionTypes.PURCHASE_BURGER_FAIL: {
      return {
        ...state,
        loading: false,
        purchased: true
      }
    }
    case actionTypes.PURCHASE_BURGER_LOADING: {
      return {
        ...state,
        loading: true
      }
    }
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      }
    case actionTypes.FETCH_ORDERS_LOADING:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.order,
        loading: false
      }
    case actionTypes.FETCH_ORDERS_FAILED:
      return {
        ...state,
        loading: false
      }
    default: {
      return state
    }
  }
}

export default reducer

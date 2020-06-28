import * as actionTypes from './actionsTypes'
import axios from '../../axios-orders'

const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id: id,
    orderData: orderData
  }
}

const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

const purchaseBurgerLoading = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_LOADING
  }
}

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerLoading())
    axios
      .post(`/orders.json?auth=${token}`, orderData)
      .then(res => {
        dispatch(purchaseBurgerSuccess(res.data.name, orderData))
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error))
      })
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

const fetchOrdersLoading = () => {
  return {
    type: actionTypes.FETCH_ORDERS_LOADING
  }
}

const fetchOrdersSuccess = orderData => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    order: orderData
  }
}

const fetchOrdersFailed = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error
  }
}

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersLoading())
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
    axios
      .get(`/orders.json${queryParams}`)
      .then(res => {
        const fetchedData = []
        for (const key in res.data) {
          fetchedData.push({
            ...res.data[key],
            id: key
          })
        }
        dispatch(fetchOrdersSuccess(fetchedData))
      })
      .catch(error => {
        dispatch(fetchOrdersFailed(error))
      })
  }
}

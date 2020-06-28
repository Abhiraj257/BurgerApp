import * as actionTypes from '../actions/actionsTypes'

const initState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  logging: false,
  url: '/'
}

const checkLogout = (state, action) => {
  return {
    ...state,
    logging: false,
    url: '/'
  }
}
const checkLogin = (state, action) => {
  return {
    ...state,
    logging: true,
    url: '/checkout'
  }
}

const authStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true
  }
}

const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }
}

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.token,
    userId: action.id,
    error: null,
    loading: false,
    logging: false
  }
}

const authLogout = (state, action) => {
  return {
    ...state,
    token: null,
    userId: null
  }
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action)
    case actionTypes.AUTH_FAIL:
      return authFail(state, action)
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action)
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action)
    case actionTypes.CHECK_LOGIN:
      return checkLogin(state, action)
    case actionTypes.CHECK_LOGOUT:
      return checkLogout(state, action)
    default:
      return state
  }
}

export default reducer

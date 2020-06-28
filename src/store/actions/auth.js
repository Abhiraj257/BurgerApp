import axios from 'axios'

import * as actionTypes from './actionsTypes'

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

const authSuccess = (idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: idToken,
    id: localId
  }
}

const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const authLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expiryDate')
  localStorage.removeItem('userId')
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = expiresIn => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout())
    }, expiresIn * 1000)
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC0_RbWNketEselPWCj6vAGg7dXP2zQjCg'
    if (!isSignup) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC0_RbWNketEselPWCj6vAGg7dXP2zQjCg'
    }
    axios
      .post(url, authData)
      .then(res => {
        const expirationTime = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        )
        localStorage.setItem('token', res.data.idToken)
        localStorage.setItem('expiryDate', expirationTime)
        localStorage.setItem('userId', res.data.localId)
        dispatch(authSuccess(res.data.idToken, res.data.localId))
        dispatch(checkLogout())
        dispatch(checkAuthTimeout(res.data.expiresIn))
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error))
      })
  }
}

export const checkLogin = () => {
  return {
    type: actionTypes.CHECK_LOGIN
  }
}

export const checkLogout = () => {
  return {
    type: actionTypes.CHECK_LOGOUT
  }
}

export const autoLogin = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(authLogout())
    } else {
      const expirationTime = new Date(localStorage.getItem('expiryDate'))
      if (expirationTime > new Date()) {
        const localId = localStorage.getItem('userId')
        dispatch(authSuccess(token, localId))
        dispatch(
          checkAuthTimeout(
            (expirationTime.getTime() - new Date().getTime()) / 1000
          )
        )
      }
    }
  }
}

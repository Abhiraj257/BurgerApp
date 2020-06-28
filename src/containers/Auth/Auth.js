import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import Aux from '../../hoc/Auxilary'

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Mail'
        },
        value: ''
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
          minLength: 6
        },
        value: ''
      }
    },
    isSignup: true
  }
  onChangeHandler = (event, id) => {
    const newControls = {
      ...this.state.controls,
      [id]: {
        ...this.state.controls[id],
        value: event.target.value
      }
    }
    this.setState({ controls: newControls })
  }

  onSubmitHandler = event => {
    event.preventDefault()
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    )
  }

  switchSignMode = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      }
    })
  }

  render() {
    const formElements = []
    for (const key in this.state.controls) {
      formElements.push({ id: key, config: this.state.controls[key] })
    }
    let form = formElements.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={event => this.onChangeHandler(event, formElement.id)}
      />
    ))
    let formContent = <Spinner />
    let error = null
    if (this.props.error) {
      error = (
        <p style={{ fontWeight: 'bold', color: 'red' }}>
          {this.props.error.message}
        </p>
      )
    }
    let redirect = null
    if (!this.props.loading) {
      if (this.props.success) {
        redirect = <Redirect to={this.props.url} />
      }
      formContent = (
        <Aux>
          {redirect}
          <form action='' onSubmit={this.onSubmitHandler}>
            {error}
            {form}
            <Button btnType='Success'>
              {!this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}
            </Button>
          </form>
          <Button clicked={this.switchSignMode} btnType='Danger'>
            {this.state.isSignup ? 'Switch to SIGN IN' : 'Switch to SIGN UP'}
          </Button>
        </Aux>
      )
    }
    return <div className={classes.Auth}>{formContent}</div>
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    success: state.auth.token ? true : false,
    url: state.auth.url
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)

import React from 'react';
import {Redirect} from 'react-router-dom';
import './authorizationLogIn.scss';
import Input from '../../styled/Input/Input'


class AuthorizationLogIn extends React.Component {
  constructor() {
    super();

    this.state = {
      redirect: null,
      login: '',
      password: '',
    };

    this.loginAsUser = this.loginAsUser.bind(this);
    this.loginAsAdmin = this.loginAsAdmin.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  loginAsUser() {
    localStorage.setItem('isAdmin', 'false');
    localStorage.setItem('isLoggedIn', 'true');
    this.setState({redirect: true});
  };

  loginAsAdmin() {
    localStorage.setItem('isAdmin', 'true');
    localStorage.setItem('isLoggedIn', 'true');
    this.setState({redirect: true});
  }

  handleInput = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const method = 'POST';
    const {login, password} = this.state;
    const body = JSON.stringify({username: login, password});
    fetch('http://localhost:8000/users/sign-in', { body, method }).then(
      res => {
        return res.status !== 400 ? res.json() : null;
      }
    ).then(
      (user) => {
        if(user) {
          localStorage.setItem('username', user.username);
          localStorage.setItem('userRole', user.role === '' ? 'reader' : user.role);
          user.powerlevel > 75 ? this.loginAsAdmin() : this.loginAsUser();
          window.location.reload();
        } else {
          this.setState({redirect: false});
        }
      }
    )
  };

  shouldComponentUpdate(nextProps, nextState){
    console.log(this.state);

    if (this.state.successLogin !== nextState.successLogin) {
      return true;
    }

    if (this.state.login !== nextState.login) {
      return true;
    }

    if (this.state.password !== nextState.password) {
      return true;
    }

    if (this.state.redirect !== nextState.redirect) {
      return true;
    }

    if (this.state.successLogin !== nextState.successLogin) {
      return true;
    }

    return false;
  }


  render() {
    const {redirect, login, password} = this.state;
    console.log("update");
    return (
      <div className="authorization-buttons">
        <h1>Sign in</h1>
        <form onSubmit={this.handleSubmit} name="loginForm" id="loginForm">
          <Input
            name="login"
            placeHolder="Login"
            id="loginIn-login"
            handleChange={this.handleInput}
            />
          <Input
            name="password"
            placeHolder="Password"
            id="loginIn-password"
            type="password"
            handleChange={this.handleInput}
            />
          <Input
            id="login-submit"
            type="submit"
            value="Sign in"
            disabled={!(login && password)}
          />
          <p>{redirect === false ? "Wrong password or username" : null}</p>
        </form>
      </div>
    );
  }
}


export default AuthorizationLogIn;

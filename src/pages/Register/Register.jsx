import React from 'react';
import {Redirect} from 'react-router-dom';
import './register.scss';
import Input from '../../components/styled/Input/Input'


class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      redirect: null,
      login: '',
      password: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const method = 'POST';
    const {login, password} = this.state;
    const body = JSON.stringify({username: login, password});
    fetch('http://localhost:8000/users', { body, method }).then(
      res => {
        return res.status !== 409 ? res.json() : null;
      }
    ).then(
      (data) => {
        if(data){
          this.setState({redirect: true});
          return;
        }
        this.setState({redirect: false});
      }
    )
  };


  render() {
    const {redirect, login, password} = this.state;
    const redirectElem = redirect ? <Redirect push to="/login"/> : null;
    return (
      <div className="register">
        <div className="authorization-buttons">
          {redirectElem}
          <h1>Sign Up</h1>
          <form onSubmit={this.handleSubmit}>
            <Input
              name="login"
              placeHolder="Login"
              id="singUp-login"
              handleChange={this.handleInput}
            />
            <Input
              name="password"
              placeHolder="Password"
              id="singUp-password"
              type="password"
              handleChange={this.handleInput}
            />
            <Input
              id="signUp-submit"
              type="submit"
              value="Sign up"
              disabled={!(login && password)}
            />
            <p>{redirect === false ? "Username is taken" : null}</p>
          </form>
        </div>
      </div>
    );
  }
}


export default Register;

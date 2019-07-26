import React from 'react';
import AuthorizationLogIn from './AuthorizationLogIn/AuthorizationLogIn';
import './authorizedComponent.scss';
import { Link } from 'react-router-dom';

class AuthorizedComponent extends React.Component {
  constructor() {
    super();


    this.state = {
      isLoggedIn: localStorage.getItem('isLoggedIn'),
      userRole: localStorage.getItem('userRole'),
    };

    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.isLoggedOut = this.isLoggedOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.setState({
      isLoggedIn: localStorage.getItem('isLoggedIn'),
      userRole: localStorage.getItem('userRole'),
    });
  }

  handleClick = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
    window.location.reload()
  };


  isLoggedIn() {
    return (
      <div className="login">
        <p>
          Currently logged as {localStorage.getItem('username')}
        </p>
        <Link
          to="/logout"
          onClick={this.handleClick}
        >
          Logout
        </Link>
      </div>
    );
  }

  isLoggedOut() {
    return (
      <div className="login">
        <AuthorizationLogIn />
      </div>
    );
  }


  render() {
    const { isLoggedIn } = this.state;
    return isLoggedIn ? this.isLoggedIn() : this.isLoggedOut();
  }
}


export default AuthorizedComponent;

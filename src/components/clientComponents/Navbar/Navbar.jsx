import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

class Navbar extends React.Component {
  constructor() {
    super();

    this.state = {
      reload: null,
    };
  }

  render() {
    return (
      <div className="navbar">
        <nav>
          <ul>
            <li>
              <Link className="link-to" to="/">Home</Link>
            </li>
            <li>
              <Link className="link-to" to="/articles">Articles</Link>
            </li>
            <li>
              <Link className="link-to" to="/about">About</Link>
            </li>
            <li>
              <Link
                className="link-to login"
                to="/login"
                onClick={() => {
                  const { reload } = this.state;
                  this.setState({ reload: !reload });
                }}
              >
                {!localStorage.getItem('isLoggedIn') ? 'Login' : localStorage.getItem('username')}
              </Link>
            </li>
            {
              !localStorage.getItem('isLoggedIn')
                ? (
                  <li>
                    <Link
                      className="link-to login"
                      to="/register"
                      onClick={() => {
                        const { reload } = this.state;
                        this.setState({ reload: !reload });
                      }}
                    >
                      Register
                    </Link>
                  </li>
                )
                : null
            }
          </ul>
        </nav>
        <div className="brand-logo">
          <p>CHO</p>
          <p>COA</p>
        </div>
      </div>
    )
  }
};

export default Navbar;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth'
import Logo from '../images/logo.jpg';

class Navbar extends Component {
  logout = e => {
    // by using arrow notation removes the issue of having to bind this
    e.preventDefault();
    this.props.logout();
  }
  
  render() {
    return (
      <nav className='navbar navbar-expand'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <Link to='/' className='navbar-brand'>
              <img src={Logo} alt='Squacker Home' />
            </Link>
          </div>
          {this.props.currentUser.isAuthenticated 
          ? (
            <ul className='nav navbar-nav navbar-right'>
              <li>
                <Link to={`/users/${this.props.currentUser.user.id}/messages/new`}>New Message</Link>
              </li>
              <li>
                <a onClick={this.logout}>Log Out</a>
              </li>
            </ul>
          ) : (
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <Link to='/signup'>Sign Up</Link>
            </li>
            <li>
              <Link to='/signin'>Sign In</Link>
            </li>
          </ul>
          )}
        </div>
      </nav>
    );
  }
}

// get state from store and map to props
// called whenever redux state changes
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

// passing in mapStateToProps so component will subscribe to redux store
// not passing in mapDispatchToProps because this component will not be dispatching any actions to store
export default connect(mapStateToProps, { logout })(Navbar);
// for logging in and signing up
import React, { Component } from 'react';

class AuthForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      profileImageUrl: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // could have used arrow notation as this does not set the context
  // instead is set to the lexical scope, meaning no .bind(this) req in constructor
  // but to keep it familiar not going to do that now
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const authType = this.props.signUp ? 'signup' : 'signin';
    // onAuth is passed in as a param in Main and is from /actions/auth {authUser}
    // returns a promise from an api call
    this.props.onAuth(authType, this.state)
      .then(() => {
        // on submit go to homepage
        // the homepage has logic to show either the general homepage or a feed
        this.props.history.push('/');
      })
      .catch(() => {
        return;
      })
  }

  render() {
    const {
      email, 
      username, 
      password, 
      profileImageUrl
    } = this.state;

    const {
      heading, 
      buttonText, 
      signUp, 
      errors, 
      history, 
      removeError
    } = this.props;

    // history is from react router
    // it will listen for any change in the route and then run callback
    history.listen(() => {
      removeError();
    });

    return (
      <div>
        <div className='row justify-content-md-center text-center'>
          <div className='col-md-6'>
            <form onSubmit={this.handleSubmit}>
              <h2>{heading}</h2>
              {errors.message &&
                <div className='alert alert-danger'>
                  {errors.message}
                </div>
              }
              <label htmlFor='email'>Email:</label>
              {/* ok because accounts cannot share email */} 
              <input 
                className='form-control' 
                id='email'
                name='email'
                onChange={this.handleChange}
                value={email}
                type='text'
              />
              <label htmlFor='password'>Password:</label>
              <input
                className='form-control' 
                id='password'
                name='password'
                onChange={this.handleChange}
                value={password}
                type='password'
              />
              {/* conditional logic to show additional fields for the signUp form */}
              {signUp && (
                <div>
                  <label htmlFor='username'>Username:</label>
                  <input 
                    className='form-control' 
                    id='username'
                    name='username'
                    onChange={this.handleChange}
                    value={username}
                    type='text'
                  />
                  <label htmlFor='image-url'>Image URL:</label>
                  <input 
                    className='form-control' 
                    id='image-url'
                    name='profileImageUrl'
                    onChange={this.handleChange}
                    value={profileImageUrl}
                    type='text'
                  />
                </div>
              )}
              <button 
                className='btn btn-primary btn-block btn-lg'
                type='submit'
              >
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthForm;


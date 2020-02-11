// Routing logic
import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm'; 
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
import withAuth from '../hocs/withAuth';
import MessageForm from '../containers/MessageForm';

const Main = props => {
  // can only pass redux actions into routes as props if also done in mapDispatchToProps
  // currentUser is from redux state below
  const { authUser, errors, removeError, currentUser } = props;
  const WithAuthMessageForm = withAuth(MessageForm);
  return (
    <div className='container'>
      <Switch>
        <Route exact path='/' render={props => <Homepage currentUser={currentUser} {...props} />} />
        <Route exact path='/signin' render={props => {
          return(
            <AuthForm 
              removeError={removeError}
              errors={errors}
              onAuth={authUser}
              buttonText='Login' 
              heading='Welcome Back'
              {...props} 
            />
          )
        }} />
        <Route 
          exact 
          path='/signup' 
          render={props => {
            return(
              <AuthForm 
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                signUp
                buttonText='Sign up' 
                heading='Join Squacker today'
                {...props} 
              />
            )
          }} 
        />
        <Route 
          exact
          path='/users/:id/messages/new' 
          render={props => {
            return(
              <WithAuthMessageForm 
                isEdit={false}
                buttonText='New Squack'
                {...props} 
              />
            )
          }}
        />
        <Route 
          exact
          path='/users/:id/messages/:message_id/edit' 
          render={props => {
            return(
              <WithAuthMessageForm 
                isEdit={true}
                buttonText='Update Squack!'
                {...props} 
              />
            )
          }}
        />
      </Switch>
    </div>
  );
}

// keys here are placed onto props from store
function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}

// with router passes router info like current location and history
// connect connects component to store
export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main));

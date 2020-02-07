// handles validation to ensure users should be viewing a certain component
import React, { Component } from 'react'
import { connect } from 'react-redux';

export default function withAuth(ComponentToBeRendered) {
  class Authenticate extends Component{
    // done before a component mounts
    // the reason this is done is because author of redux 
    // believes its risky to dispatch actions from the constructor
    // and may result in mutating the state while rendering

    // when the component first loads, check if authenticated
    componentWillMount() {
      if (this.props.isAuthenticated === false) {
        this.props.history.push('/signin');
      }
    }

    // when react state changes, check if authenticated
    componentWillUpdate(nextProps) {
      if (nextProps.isAuthenticated === false) {
        this.props.history.push('/signin');
      }
    }
    render () {
      return <ComponentToBeRendered {...this.props} />;
    }
  }

  function mapStateToProps(state){
    return {
      isAuthenticated: state.currentUser.isAuthenticated
    }
  }

  return connect(mapStateToProps)(Authenticate);
}
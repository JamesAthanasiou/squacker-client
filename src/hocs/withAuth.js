// handles validation to ensure users should be viewing a certain component
import React, { Component } from 'react'
import { connect } from 'react-redux';

export default function withAuth(ComponentToBeRendered) {
  class Authenticate extends Component{
    constructor(props){
      super(props);
          // when the component first loads, check if authenticated
      if (this.props.isAuthenticated === false) {
        this.props.history.push('/signin');
      }
    }

    // when react state changes, check if authenticated
    componentDidUpdate(nextProps) {
      if (nextProps.isAuthenticated === false) {
        this.props.history.push('/signin');
      }
    }
    render () {
      console.log(this.props);
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
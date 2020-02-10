import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewMessage, updateMessage } from '../store/actions/messages';

// message form must be aware if the person accessed it by the form button or the edit button.
// must somehow change what is rendered in the form onSubmit

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message:''
    };
    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.handleUpdateMessage = this.handleUpdateMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }



  handleNewMessage(e) {
    e.preventDefault();
    this.props.postNewMessage(this.state.message);
    this.setState({ message: '' });
    this.props.history.push('/');
  }

  handleUpdateMessage(e) {
    e.preventDefault();
    this.props.udpateMessage(this.state.message);
    this.setState({ message: '' });
    this.props.history.push('/');
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render () {
    return (
      <form onSubmit={this.handleNewMessage}>
        {this.props.errors.message && (
          <div className='alert alert-danger'>
            {this.props.errors.message}
          </div>
        )}
        <input
          type='text'
          name='message'
          className='form-control'
          value={this.state.message}
          onChange={this.handleChange}
        />
        <button type='submit' className='btn btn-success pull-right'>
          Add a Squack
        </button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { postNewMessage, updateMessage })(MessageForm);
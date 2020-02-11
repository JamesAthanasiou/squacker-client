// MessageForm is both used for creating and updating messages

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewMessage, updateMessage, fetchMessages } from '../store/actions/messages';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message:'', 
    };
    this.handleNewMessage = this.handleNewMessage.bind(this); 
    this.handleUpdateMessage = this.handleUpdateMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getMessages = this.getMessages.bind(this);
  }

  // used to add text to the input in the case of editing
  async componentDidMount() {
    // typically this page is accessed after messages have already loaded
    // however in the case where the url is directly accessed messages have not loaded so fetch messages
    await this.getMessages();
    // set input text
    if (this.props.isEdit){
      const message_id = this.props.match.params.message_id;
      // this will not scale but it works for the time being. 
      // in the future try to find a way to pass in id of which item was clicked
      let currentMessage = (this.props.messages.filter(message => message._id === message_id))[0].text;
      this.setState({ message: currentMessage })
    }
  }

  // truth be told, not entirely sure if nesting async functions is the right way
  // it does however appear to be the only way it will work as it is currently set up
  async getMessages() {
    if (typeof messages === 'undefined'){
      await this.props.fetchMessages();
    }
  }

  // handlers

  handleNewMessage(e) {
    e.preventDefault();
    this.props.postNewMessage(this.state.message);
    this.setState({ message: ''});
    this.props.history.push('/');
  }

  handleUpdateMessage(e) {
    e.preventDefault();
    const message_id = this.props.match.params.message_id;
    const user_id = this.props.match.params.id;
    const message = this.state.message; 
    this.props.updateMessage(user_id, message_id, message);
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
      <form onSubmit={this.props.isEdit ? this.handleUpdateMessage : this.handleNewMessage}>
        {this.props.errors.message && (
          <div className='alert alert-danger'>
            {this.props.errors.message}
          </div>
        )}
        <div className='input-group'>
          <input
            type='text'
            name='message'
            className='form-control'
            value={this.state.message}
            onChange={this.handleChange}
          />
          <span className='input-group-btn'>
            <button type='submit' className='btn btn-success pull-right'>
              {this.props.buttonText}
            </button>
          </span>
        </div>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
    messages: state.messages
  };
}

export default connect(mapStateToProps, { postNewMessage, updateMessage, fetchMessages })(MessageForm);
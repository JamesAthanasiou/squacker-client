import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_MESSAGES, REMOVE_MESSAGE } from '../actionTypes';

// action creators
export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
});

export const remove = id => ({
  type: REMOVE_MESSAGE,
  id
});

// these make the API calls 
// apiCall adds token in header
export const fetchMessages = () => {
  return dispatch => {
    return apiCall('get', '/api/messages')
      .then(res => { 
        dispatch(loadMessages(res))
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

// call to add new message to the db
export const postNewMessage = text => (dispatch, getState) => {
  // check current user
  let { currentUser } = getState();
  const id = currentUser.user.id;
  // send post request to api with 
  return apiCall('post', `/api/users/${id}/messages`, { text })
    .then(res => {})
    .catch(err => dispatch(addError(err.message)));
}

export const updateMessage = (user_id, message_id, text) => {
  return dispatch => {
    // make a put request to message
    return apiCall('put', `/api/users/${user_id}/messages/${message_id}`, { text })
      // after upsate the message in state
      .then(res => {})
      .catch(err => dispatch(addError(err.message)));
  }
}

export const removeMessage = (user_id, message_id) => {
  return dispatch => {
    return apiCall('delete', `/api/users/${user_id}/messages/${message_id}`)
      .then(() => dispatch(remove(message_id)))
      .catch(err => dispatch(addError(err.message)));
  };
};
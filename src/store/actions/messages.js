import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_MESSAGES, REMOVE_MESSAGE } from '../actionTypes';

export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
});

export const remove = id => ({
  type: REMOVE_MESSAGE,
  id
});

export const removeMessage = (user_id, message_id) => {
  
  return dispatch => {
    return apiCall('delete', `/api/users/${user_id}/messages/${message_id}`)
      .then(() => dispatch(remove(message_id)))
      // this right here is the error, so something in the delete call isn't working.
      // 5e3ce13262502993177b1dac, user id 5e39be1cfd75cb74e6c4e977
      .catch(err => dispatch(addError(err.message)));
       /*http://localhost:3000/api/users/5e39be1cfd75cb74e6c4e977/messages/5e3ce13262502993177b1dac */
  };
};

// how to add token to header? see services/api!
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
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall('post', `/api/users/${id}/messages`, { text })
    .then(res => {})
    .catch(err => dispatch(addError(err.message)));
}
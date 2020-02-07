import { apiCall, setTokenHeader } from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError } from './errors';

export function setCurrentUser(user) {
  // what is sent to reducer
  return {
    type: SET_CURRENT_USER,
    user
  };
}

// used to attach token to header
export function setAuthorizationToken(token){
  setTokenHeader(token);
}

// logout
export function logout() {
  return dispatch => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

// login
export function authUser(type, userData){
  return dispatch => {
    // must wait for api call to finish before dispatching
    return new Promise((resolve, reject) => {
      // don't use POST here, will not work
      return apiCall('post', `/api/auth/${type}`, userData)
        // using destructuring so we don't need to use data.token, just token
        // rest of data is called user
        .then(({token, ...user}) => {
          localStorage.setItem('jwtToken', token);
          setAuthorizationToken(token)
          dispatch(setCurrentUser(user));
          dispatch(removeError());
          // API call success
          resolve();
        })
        .catch(err => {
          // the err.message is coming from the server in the error object
          dispatch(addError(err.message));
          // indicate API call did not work
          reject();
        })
    });
  };
}
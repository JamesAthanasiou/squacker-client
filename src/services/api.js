// a generic way to make an ajax request
import axios from 'axios';

export function setTokenHeader(token){
  if(token){
    // if the user is logged in tere will be a token
    // use that token in the header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // when a user logs out, token is removed
    // that triggers this code and the token is removed from the header
    delete axios.defaults.headers.common['Authorization'];
  }
}

// an axios API call that is wrapped in an error handler
// method is the HTTP verb,
// path is the endpoint
// data is optional
export function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    // use brackes to evaluate method. using .method would look for a property
    // make the method lowercase since axios does not like 'GET' or 'POST'
    return axios[method.toLowerCase()](path, data)
      .then (res => {
        return resolve(res.data);
      })
      .catch (err => {
        return reject(err.response.data.error);
      });
  });
}
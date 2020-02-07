// import error action types
import { ADD_ERROR, REMOVE_ERROR } from '../actionTypes';

// a generic error handler for adding and removing errors
// this is probably self documenting code but better safe than sorry
export default (state = {message: null}, action) => {
  switch(action.type) {
    case ADD_ERROR:
      return {...state, message: action.error};
    case REMOVE_ERROR:
      return {...state, message: null};
    default:
      return state;
  }
};
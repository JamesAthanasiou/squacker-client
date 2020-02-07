import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import messages from './messages';

// reducers determine changeds to an application's state based on the action it receives
const rootReducer = combineReducers({
  // using shorthand notation since currentUser:currentUser
  currentUser, 
  errors,
  messages
});

export default rootReducer;
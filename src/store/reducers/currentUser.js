import { SET_CURRENT_USER } from '../actionTypes';

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {} // when a user logs in this is there info, cleared at logout
};

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        // if the object has keys, return true
        // using !! will turn an empty object into false
        // alternatively can omit the !! and just check if > 0
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user
      };
    default:
      return state;
  }
};
import { ADD_ERROR, REMOVE_ERROR } from '../actionTypes';
// make some action creators for adding and removing errors.

// add error returns an object so must use parans aroung curly braces
// that indicates it is not a function to be evaluated but an obj
export const addError = error => ({
  type: ADD_ERROR,
  error
})

export const removeError = () => ({
  type: REMOVE_ERROR,
})
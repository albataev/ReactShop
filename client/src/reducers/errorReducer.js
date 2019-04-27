import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
  case GET_ERRORS:
    console.log('[errorReducer GET_ERRORS fired]', action.payload);
    return action.payload;
  case CLEAR_ERRORS:
    console.log('[errorReducer CLEAR_ERRORS fired]');
    return {};
  default:
    return state;
  }
}

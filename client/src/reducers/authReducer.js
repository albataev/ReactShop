import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';
const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
  case SET_CURRENT_USER:
    console.log('[authReducer SET_CURRENT_USER fired]', action.payload);
    return {
      ...state,
      isAuthenticated: !isEmpty(action.payload),
      user: action.payload
    };
  default:
    return state;
  }
}

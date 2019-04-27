import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import shopReducer from './shopReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  shop: shopReducer
});

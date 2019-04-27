import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// register user
// to make async call we have to put another arrow with dispatch call
// this dispatch call we can make because of the redux-thunk
export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => {
      history.push('/login');
      console.log('[authActions registerUser] SUCCESS', res.data);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      console.log('[authActions registerUser] ERROR', err.response.data);
    });
};

// login - Get User Token

export const loginUser = userData => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      console.log('[authActions loginUser] SUCCESS', res.data);
      const { token } = res.data;
      // set token to LocalStorage
      localStorage.setItem('jwtToken', token);
      // set token to Auth header
      setAuthToken(token);
      // decode token to get user data
      const decoded = jwtDecode(token);
      // set current user
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      console.log('[authActions loginUser] ERROR', err.response.data);
    });
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// log user out
export const logoutUser = () => dispatch => {
  console.log('[authActions logoutUser] SUCCESS');
  localStorage.removeItem('jwtToken');
  // remove auth header for future requests
  setAuthToken(false);
  // set current user to {} and isAuthenticated to false
  dispatch(setCurrentUser({}));
};

import {
  AUTH_LOGIN_USER_FAIL,
  AUTH_LOGIN_USER_SUCCESS,
  AUTH_LOGIN_CLEAR_ERROR,
} from './actionTypes';

const initialState = {
  errorLoging: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_USER_SUCCESS: {
      return {
        ...state,
        errorLoging: action.errorMessage,
      };
    }
    case AUTH_LOGIN_USER_FAIL: {
      return {
        ...state,
        errorLoging: action.errorMessage,
      };
    }
    case AUTH_LOGIN_CLEAR_ERROR: {
      return {
        ...state,
        errorLoging: action.errorMessage,
      };
    }
    default:
      return state;
  }
};

export default loginReducer;

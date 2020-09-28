import {
  AUTH_CREATE_USER_FAIL,
  AUTH_CREATE_USER_SUCCESS,
  AUTH_CREATE_USER_CLEAR_ERROR,
} from './actionTypes';

const initialState = {
  errorCreateUser: null,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_CREATE_USER_SUCCESS: {
      return {
        ...state,
        errorCreateUser: null,
      };
    }
    case AUTH_CREATE_USER_FAIL: {
      return {
        ...state,
        errorCreateUser: action.errorMessage,
      };
    }
    case AUTH_CREATE_USER_CLEAR_ERROR: {
      return {
        ...state,
        errorCreateUser: action.errorMessage,
      };
    }
    default:
      return state;
  }
};

export default registerReducer;

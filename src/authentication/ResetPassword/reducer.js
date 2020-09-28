import {
  AUTH_RESET_PASSWORD_FAIL,
  AUTH_RESET_PASSWORD_SUCCES,
  AUTH_RESET_PASSWORD_CLEAR_ERROR,
} from './actionTypes';

const initialState = {
  errorResetPassword: null,
};

const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_RESET_PASSWORD_FAIL: {
      return {
        ...state,
        errorResetPassword: action.errorMessage,
      };
    }
    case AUTH_RESET_PASSWORD_SUCCES: {
      return {
        ...state,
        errorResetPassword: null,
      };
    }
    case AUTH_RESET_PASSWORD_CLEAR_ERROR: {
      return {
        ...state,
        errorResetPassword: action.errorMessage,
      };
    }
    default:
      return state;
  }
};

export default resetPasswordReducer;

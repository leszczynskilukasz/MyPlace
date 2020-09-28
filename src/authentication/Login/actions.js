import firebase from 'firebase';
import 'firebase/firestore';
import {
  AUTH_LOGIN_USER_FAIL,
  AUTH_LOGIN_USER_SUCCESS,
  AUTH_LOGIN_CLEAR_ERROR,
} from './actionTypes';
import * as InfoMessage from '../const/InfoMessages';
import * as ErrorCode from '../const/ErrorCodes';

const loginUser = (email, password, navigation) => (dispatch) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      if (firebase.auth().currentUser.emailVerified) {
        dispatch(loginUserSuccess());
      } else {
        dispatchEmailNotVerified(dispatch);
      }
    })
    .then(() => navigation.navigate('Loading'))
    .catch((error) => {
      switch (error.code) {
        case ErrorCode.WRONG_PASSWORD:
        case ErrorCode.INVALID_EMAIL:
        case ErrorCode.USER_NOT_FOUND:
          dispatch(loginUserFail(InfoMessage.INCORRECT_EMAIL_OR_PASSWORD));
          break;
        case ErrorCode.NETWORK_REQUEST_FAILED: dispatch(loginUserFail(InfoMessage.CONNECTION_LOST));
          break;
        case ErrorCode.USER_DISABLED: dispatch(loginUserFail(InfoMessage.ACCOUNT_BANNED));
          break;
        case ErrorCode.TOO_MANY_ATTEMPTS_LOGIN: dispatch(loginUserFail(InfoMessage.TOO_MANY_REQUESTS));
          break;
        default: dispatch(loginUserFail(InfoMessage.SOMETHING_WENT_WRONG));
      }
    });
};

const dispatchEmailNotVerified = (dispatch) => {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  }
  dispatch(loginUserFail(InfoMessage.CONFIRM_EMAIL));
};

const loginUserFail = (error) => ({
  type: AUTH_LOGIN_USER_FAIL,
  errorMessage: error,
});

const loginUserSuccess = () => ({
  type: AUTH_LOGIN_USER_SUCCESS,
  errorMessage: null,
});

export const clearError = () => ({
  type: AUTH_LOGIN_CLEAR_ERROR,
  errorMessage: null,
});

export default loginUser;

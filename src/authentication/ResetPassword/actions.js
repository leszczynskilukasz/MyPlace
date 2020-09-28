import firebase from 'firebase';
import 'firebase/firestore';
import { Alert } from 'react-native';
import { AUTH_RESET_PASSWORD_FAIL, AUTH_RESET_PASSWORD_SUCCES, AUTH_RESET_PASSWORD_CLEAR_ERROR } from './actionTypes';
import * as Message from '../const/InfoMessages';
import * as ErrorCode from '../const/ErrorCodes';

const sendResetPassword = (email, navigation) => (dispatch) => {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      dispatch(resetPasswordSucces());
      Alert.alert(Message.RESET_PASSWORD_SUCCESS, Message.RESET_PASSWORD_SUCCESS_INFO, [{ text: 'OK' }], { cancelable: false });
      navigation.navigate('Login');
    })
    .catch((error) => {
      switch (error.code) {
        case ErrorCode.INVALID_EMAIL:
          dispatch(resetPasswordFail(Message.INCORRECT_EMAIL_FORMAT));
          break;
        case ErrorCode.USER_NOT_FOUND:
          dispatch(resetPasswordFail(Message.USER_NOT_FOUND));
          break;
        default: dispatch(resetPasswordFail(Message.SOMETHING_WENT_WRONG));
      }
    });
};

const resetPasswordFail = (error) => ({
  type: AUTH_RESET_PASSWORD_FAIL,
  errorMessage: error,
});

const resetPasswordSucces = () => ({
  type: AUTH_RESET_PASSWORD_SUCCES,
  errorMessage: null,
});

export const clearError = () => ({
  type: AUTH_RESET_PASSWORD_CLEAR_ERROR,
  errorMessage: null,
});

export default sendResetPassword;

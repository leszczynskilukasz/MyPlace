import firebase from 'firebase';
import 'firebase/firestore';
import { Alert } from 'react-native';
import {
  AUTH_CREATE_USER_FAIL,
  AUTH_CREATE_USER_SUCCESS,
  AUTH_CREATE_USER_CLEAR_ERROR,
} from './actionTypes';
import * as Message from '../const/InfoMessages';
import * as ErrorCode from '../const/ErrorCodes';

const regexNickname = /^[a-zA-Z0-9]*$/;
const regexNicknameMinLength = /.{4,}/;
const regexEmail = /^[a-zA-Z0-9.]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const regexPasswordUpperCase = /(?=.*[A-Z])/;
const regexPasswordLowerCase = /(?=.*[a-z])/;
const regexPasswordDigit = /(?=.*[0-9])/;
const regexPasswordSpecialCharacter = /(?=.*[!@#$%^&*])/;
const regexPasswordMinLength = /.{8,}/;

const createUser = (nickname, email, password, confirmPassword, usedNicknames) => (dispatch) => {
  if (validation(nickname, email, password, confirmPassword, usedNicknames, dispatch)) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        if (resp) {
          dispatch(createUserSuccess());
          firebase.auth().currentUser.sendEmailVerification();
          Alert.alert(Message.ACCOUNT_CREATED, Message.CONFIRM_EMAIL, [{ text: 'OK' }], { cancelable: false });
          firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
            nickname,
          });
        }
      })
      .catch((error) => {
        switch (error.code) {
          case ErrorCode.INVALID_EMAIL: dispatch(createUserFail(Message.INCORRECT_EMAIL_FORMAT));
            break;
          case ErrorCode.WEAK_PASSWORD: dispatch(createUserFail(Message.WEAK_PASSWORD));
            break;
          case ErrorCode.EMAIL_ALREADY_EXISTS: dispatch(createUserFail(Message.EMAIL_ALREADY_EXISTS));
            break;
          default: dispatch(createUserFail(Message.SOMETHING_WENT_WRONG));
        }
      });
  }
};

const createUserFail = (error) => ({
  type: AUTH_CREATE_USER_FAIL,
  errorMessage: error,
});

const createUserSuccess = () => ({
  type: AUTH_CREATE_USER_SUCCESS,
});

const validation = (nickname, email, password, confirmPassword, usedNicknames, dispatch) => {
  if (usedNicknames.includes(nickname)) {
    dispatch(createUserFail(Message.NICKNAME_USED));
    return false;
  }
  if (!regexNicknameMinLength.test(nickname)) {
    dispatch(createUserFail(Message.NICKNAME_LENGTH));
    return false;
  }
  if (!regexNickname.test(nickname)) {
    dispatch(createUserFail(Message.INCORRECT_NICKNAME));
    return false;
  }
  if (!regexEmail.test(email)) {
    dispatch(createUserFail(Message.INCORRECT_EMAIL_FORMAT));
    return false;
  }
  if (password !== confirmPassword) {
    dispatch(createUserFail(Message.WRONG_CONFIRM_PASSWORD));
    return false;
  }
  if (!regexPasswordUpperCase.test(password)) {
    dispatch(createUserFail(Message.PASSWORD_CONDITION_UPPERCASE_CHAR));
    return false;
  }
  if (!regexPasswordLowerCase.test(password)) {
    dispatch(createUserFail(Message.PASSWORD_CONDITION_LOWERCASE_CHAR));
    return false;
  }
  if (!regexPasswordDigit.test(password)) {
    dispatch(createUserFail(Message.PASSWORD_CONDITION_DIGIT));
    return false;
  }
  if (!regexPasswordSpecialCharacter.test(password)) {
    dispatch(createUserFail(Message.PASSWORD_CONDITION_SPECIAL_CHAR));
    return false;
  }
  if (!regexPasswordMinLength.test(password)) {
    dispatch(createUserFail(Message.PASSWORD_CONDITION_LENGTH));
    return false;
  }
  return true;
};

export const clearError = () => ({
  type: AUTH_CREATE_USER_CLEAR_ERROR,
  errorMessage: null,
});

export default createUser;

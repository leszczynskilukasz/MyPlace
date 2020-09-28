import { combineReducers } from 'redux';
import loginReducer from '../authentication/Login/reducer';
import registerReducer from '../authentication/Register/reducer';
import resetPasswordReducer from '../authentication/ResetPassword/reducer';

const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
  resetPasswordReducer,
});

export default rootReducer;

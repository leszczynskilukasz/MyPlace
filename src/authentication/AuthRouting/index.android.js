import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Loading from '../Loading/index.android';
import Login from '../Login/index.android';
import Register from '../Register/index.android';
import AppRouting from '../../app/AppRouting/index.android';
import ResetPassword from '../ResetPassword/index.android';

const AuthRouting = createSwitchNavigator(
  {
    Loading: {
      screen: Loading,
    },
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    },
    ResetPassword: {
      screen: ResetPassword,
    },
    AppRouting: {
      screen: AppRouting,
    },
  },
  {
    initialRouteName: 'Loading',
  },
);

export default createAppContainer(AuthRouting);

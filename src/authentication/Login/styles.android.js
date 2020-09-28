import { StyleSheet, StatusBar } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const LOGO_WITHOUT_KEYBOARD_WIDTH = wp('95%');
export const LOGO_WITHOUT_KEYBOARD_HEIGHT = wp('95%');
export const LOGO_WITH_KEYBOARD_WIDTH = wp('50%');
export const LOGO_WITH_KEYBOARD_HEIGHT = wp('50%');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  Logo: {
    resizeMode: 'contain',
    marginTop: StatusBar.currentHeight,
  },
  textSignUp: {
    fontSize: 20,
    paddingBottom: 10,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
  },
  textInput: {
    marginTop: 7,
  },
  buttonLogin: {
    marginTop: 20,
  },
  linkForgotPassword: {
    alignSelf: 'flex-start',
    marginLeft: wp('15%'),
    marginTop: 15,
    fontSize: 16,
    color: '#498eec',
    textDecorationLine: 'underline',
  },
});

export default styles;

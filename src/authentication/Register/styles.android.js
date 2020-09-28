import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const LOGO_WITHOUT_KEYBOARD = wp('70%');
export const LOGO_WITH_KEYBOARD = wp('50%');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logoImage: {
    resizeMode: 'contain',
    marginTop: hp('5%'),
    marginBottom: hp('2%'),
  },
  textLogin: {
    fontSize: 20,
    paddingRight: 10,
    paddingBottom: 10,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
  textInput: {
    marginTop: 7,
  },
  buttonSignUp: {
    marginTop: 25,
  },
});

export default styles;

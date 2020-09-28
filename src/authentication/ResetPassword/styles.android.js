import { StyleSheet } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logoImage: {
    width: wp('90%'),
    height: wp('50%'),
    resizeMode: 'contain',
    marginTop: hp('7%'),
  },
  textInfo: {
    marginTop: 25,
    fontSize: 20,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
    marginBottom: 5,
  },
  textInput: {
    marginTop: 7,
  },
  buttonResetPassword: {
    marginTop: 20,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
});

export default styles;

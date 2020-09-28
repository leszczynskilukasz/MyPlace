import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  buttonWhiteBlueBorder: {
    width: wp('70%'),
    height: 45,
    borderColor: '#3897f0',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonWhiteBlueBorder: {
    fontSize: 20,
    color: '#3897f0',
    fontWeight: 'bold',
  },
  blueButton: {
    width: wp('80%'),
    height: 45,
    borderColor: '#3897f0',
    backgroundColor: '#3897f0',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBlueButton: {
    fontSize: 20,
    color: '#fff',
  },
});

export default styles;

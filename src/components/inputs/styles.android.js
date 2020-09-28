import { StyleSheet } from 'react-native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  textInputRounded: {
    width: wp('80%'),
    height: 45,
    borderRadius: 25,
    paddingLeft: 25,
    borderColor: '#C3C6C9',
    borderWidth: 1,
    fontSize: 16,
  },
});

export default styles;

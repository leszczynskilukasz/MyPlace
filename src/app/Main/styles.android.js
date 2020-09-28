import { StyleSheet, StatusBar } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  textInputSearch: {
    marginTop: 10,
    marginLeft: wp('2%'),
    paddingLeft: 10,
    backgroundColor: '#fff',
    height: 50,
    width: wp('85%'),
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  textLocation: {
    width: wp('80%'),
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center',
    backgroundColor: '#fff',
    height: 45,
    marginLeft: wp('4.5%'),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonClearSearch: {
    margin: 5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  searchSegment: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  loadingIndicator: {
    marginLeft: wp('44.5%'),
  },
  checkboxRadiusArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default styles;

import { StyleSheet, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    marginTop: StatusBar.currentHeight,
    width: wp('100%'),
    height: hp('10%'),
    backgroundColor: '#3897f0',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  topBarTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  topBarText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  favoritePlaceContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: wp('90%'),
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
    margin: 5,
    padding: 10,
  },
  textNamePlace: {
    fontSize: 20,
  },
  textRatingPlace: {
    left: 50,
    fontSize: 20,
  },
  loadingIndicator: {
    height: hp('20%'),
  },
  iconStarOpinion: {
    left: 55,
  },
});

export default styles;

import { StyleSheet, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  topBarBackIcon: {
    color: '#fff',
    left: 20,
    alignSelf: 'center',
  },
  textNamePlace: {
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 30,
  },
  yourRatingContainer: {
    borderColor: '#D2CDCD',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    width: wp('90%'),
    height: hp('50%'),
  },
  textYourRating: {
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: 25,
  },
  textInputOpinion: {
    margin: 10,
  },
  buttonConfirmOpinion: {
    width: wp('30%'),
    height: 30,
    borderRadius: 10,
    marginTop: 20,
    marginRight: 10,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  textButtonConfirmOpinion: {
    alignSelf: 'center',
    color: '#fff',
  },
  opinionHeaderContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: 10,
  },
  textAvrRating: {
    left: 50,
    paddingTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  iconStarOpinion: {
    left: 50,
    paddingTop: 10,
  },
});

export default styles;

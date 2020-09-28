import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  opinionContainer: {
    width: wp('90%'),
    alignContent: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    margin: 5,
    padding: 10,
  },
  textAuthorAndDateContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  textNickname: {
    fontWeight: 'bold',
  },
  textOpinionRating: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iconStarOpinion: {
    alignSelf: 'center',
  },
  textOpinion: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
  },
  loadingIndicator: {
    height: hp('20%'),
  },
  showComment: {
    color: '#989898',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
});

export default styles;

import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firebase from 'firebase';
import 'firebase/firestore';
import { CheckBox } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import { AirbnbRating } from 'react-native-ratings';
import { BlueButton } from '../../components/buttons/index.android';
import styles from './styles.android';
import Opinion from './OpinionObject/index.android';

class PlaceInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: null,
      myFavoritePlace: false,
      myRating: 0,
      myOpinion: null,
      allOpinions: null,
      avrRating: 0,
    };
  }

  componentWillMount() {
    const { navigation } = this.props;
    this.setState({ place: navigation.getParam('place', null) }, this.getOpinions);
  }

  getOpinions = async () => {
    const { place } = this.state;
    const opinions = await firebase.firestore().collection('places').doc(place.placeId).collection('opinions')
      .get();
    const userId = firebase.auth().currentUser.uid;
    const actualOpinion = opinions.docs.find((d) => d.id === userId);
    if (actualOpinion !== undefined) {
      const favoritePlacesCurrentUser = await firebase.firestore().collection('users').doc(userId).collection('favoritePlaces')
        .get();
      this.setState({ myRating: actualOpinion.data().rating, myOpinion: actualOpinion.data().opinion });
      if (favoritePlacesCurrentUser.docs.some((d) => d.id === place.placeId)) {
        this.setState({ myFavoritePlace: true });
      }
    }
    if (opinions) {
      const allRatings = opinions.docs.map((o) => o.data().rating);
      const sumRating = allRatings.reduce((prev, next) => prev + next, 0);
      const avrRating = sumRating / allRatings.length;
      this.setState({ allOpinions: opinions });
      if (!Number.isNaN(avrRating)) {
        this.setState({ avrRating });
      }
    }
  }

  saveOpinion = () => {
    const {
      place, myRating, myOpinion, myFavoritePlace,
    } = this.state;
    const { name, coordinate, position } = place;
    if (myRating === null || myRating === undefined || myRating === 0) {
      Alert.alert('Rating', 'Please enter your rating using stars', [{ text: 'OK' }], { cancelable: false });
    } else {
      firebase.firestore().collection('places')
        .doc(place.placeId).collection('opinions')
        .doc(firebase.auth().currentUser.uid)
        .set({
          name,
          coordinate,
          position,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          rating: myRating,
          opinion: myOpinion,
        })
        .then(() => {
          if (myFavoritePlace) {
            firebase.firestore().collection('users')
              .doc(firebase.auth().currentUser.uid)
              .collection('favoritePlaces')
              .doc(place.placeId)
              .set({
                name,
                rating: myRating,
              });
          }
        })
        .then(() => this.getOpinions())
        .then(() => Alert.alert('Thank You', 'Your rating has been added', [{ text: 'OK' }], { cancelable: false }));
    }
  }

  render() {
    const {
      place, myFavoritePlace, myRating, myOpinion, allOpinions, avrRating,
    } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.topBar}>
          <FontAwesome5 name="angle-left" size={50} style={styles.topBarBackIcon} onPress={() => navigation.goBack()} />
          <View style={styles.topBarTextContainer}>
            <Text adjustsFontSizeToFit style={styles.topBarText}>Review</Text>
          </View>
        </View>
        {place ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.textNamePlace}>{place.name}</Text>
            <View style={styles.yourRatingContainer}>
              <Text style={styles.textYourRating}>Your rating</Text>
              <AirbnbRating
                count={5}
                reviews={['Terrible', 'Bad', 'OK', 'Good', 'Amazing']}
                defaultRating={myRating}
                size={30}
                onFinishRating={(value) => this.setState({ myRating: value })}
              />
              <ScrollView style={styles.textInputOpinion}>
                <TextInput value={myOpinion} onChangeText={(v) => this.setState({ myOpinion: v })} multiline numberOfLines={5} placeholder="Write your opinion..." />
              </ScrollView>
              <CheckBox
                title="Add To MyFavoritePlaces list"
                onPress={() => this.setState({ myFavoritePlace: !myFavoritePlace })}
                checked={myFavoritePlace}
              />
              <BlueButton propStyle={styles.buttonConfirmOpinion} func={() => this.saveOpinion()} text="Save" />
            </View>
            <View style={styles.opinionsContainer}>
              <View style={styles.opinionHeaderContainer}>
                <Text style={styles.textYourRating}>Opinions</Text>
                <Text style={styles.textAvrRating}>{avrRating !== 0 ? avrRating.toFixed(2) : ''}</Text>
                <MaterialIcons style={styles.iconStarOpinion} name="star" size={30} color="gold" />
              </View>
              {allOpinions ? allOpinions.docs.map((o) => <Opinion key={o.id} data={o} />) : null}
            </View>
          </ScrollView>
        )
          : <ActivityIndicator />}
      </View>
    );
  }
}

PlaceInfo.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default PlaceInfo;

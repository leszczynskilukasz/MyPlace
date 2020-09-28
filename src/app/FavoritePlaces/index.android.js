import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import 'firebase/firestore';
import { withNavigationFocus } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles.android';

class FavoritePlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
    };
  }

  componentWillMount() {
    this.getFavoritePlaces();
  }

  componentDidUpdate(prevProps) {
    const { isFocused } = this.props;
    if (prevProps.isFocused !== isFocused) {
      this.getFavoritePlaces();
    }
  }

  getFavoritePlaces = async () => {
    const favoritePlaces = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('favoritePlaces')
      .get();
    if (favoritePlaces) {
      const places = favoritePlaces.docs.map((fP) => fP.data());
      this.setState({ places });
    }
  }

  render() {
    const { places } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.topBar}>
          <View style={styles.topBarTextContainer}>
            <Text adjustsFontSizeToFit style={styles.topBarText}>Favorite Places</Text>
          </View>
        </View>
        {places ? (
          <View style={styles.opinionContainer}>
            {places.map((p) => (
              <View key={p.name} style={styles.favoritePlaceContainer}>
                <Text style={styles.textNamePlace}>{p.name}</Text>
                <Text style={styles.textRatingPlace}>{p.rating}</Text>
                <MaterialIcons style={styles.iconStarOpinion} name="star" size={25} color="gold" />
              </View>
            ))}
          </View>
        ) : <ActivityIndicator style={styles.loadingIndicator} />}
      </View>
    );
  }
}

FavoritePlaces.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(FavoritePlaces);

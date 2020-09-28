import React, { Component } from 'react';
import {
  View,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styles from './styles.android';

import logo from '../../../assets/Logo.png';

class Loading extends Component {
  componentDidMount() {
    setTimeout(this.isLogged, 1000);
  }

  isLogged = () => {
    const { navigation } = this.props;
    firebase
      .auth()
      .onAuthStateChanged(async (user) => ((user && user.emailVerified) ? navigation.navigate('AppRouting') : navigation.navigate('Login')));
  }

  render() {
    return (
      <View style={styles.container}>
        <Ionicons name="ios-pin" size={wp('50%')} />
        <Image fadeDuration={1000} style={styles.logoImage} source={logo} />
      </View>
    );
  }
}

Loading.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Loading;

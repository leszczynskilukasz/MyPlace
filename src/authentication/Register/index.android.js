import React, { Component } from 'react';
import {
  Text,
  View,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles, { LOGO_WITHOUT_KEYBOARD, LOGO_WITH_KEYBOARD } from './styles.android';
import createUser, { clearError } from './actions';
import logoImage from '../../../assets/Logo.png';
import { ButtonWhiteBlueBorder, BlueButton } from '../../components/buttons/index.android';
import { TextInputRounded, PasswordTextInputRounded } from '../../components/inputs/index.android';

const ALREADY_HAVE_ACC = 'Already have an account?';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
      usedNicknames: [],
    };
    this.imageSize = new Animated.Value(LOGO_WITHOUT_KEYBOARD);
  }

  componentWillMount() {
    this.getNicknames();
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  getNicknames = async () => {
    const snapshotUsers = await firebase.firestore().collection('users').get();
    const usedNicknames = snapshotUsers.docs.map((user) => user.data().nickname);
    this.setState({ usedNicknames });
  }

  _keyboardDidShow = () => {
    Animated.spring(this.imageSize, {
      toValue: LOGO_WITH_KEYBOARD,
    }).start();
  };

  _keyboardDidHide = () => {
    Animated.spring(this.imageSize, {
      toValue: LOGO_WITHOUT_KEYBOARD,
    }).start();
  };

  handleSignUp = () => {
    const {
      nickname, email, password, confirmPassword, usedNicknames,
    } = this.state;
    const { createUserProfile } = this.props;
    createUserProfile(nickname, email, password, confirmPassword, usedNicknames);
  }

  navigate(page) {
    const { clearErrorText, navigation } = this.props;
    navigation.navigate(page);
    clearErrorText();
  }

  render() {
    const {
      nickname,
      email,
      password,
      confirmPassword,
    } = this.state;
    const { store } = this.props;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <Animated.Image fadeDuration={0} style={[styles.logoImage, { height: this.imageSize, width: this.imageSize }]} source={logoImage} />
        {store.errorCreateUser
          && (<Text style={styles.errorMessage}>{store.errorCreateUser}</Text>)}
        <TextInputRounded propStyle={styles.textInput} value={nickname} onChange={(nicknameValue) => this.setState({ nickname: nicknameValue })} placeholder="Nickname" />
        <TextInputRounded propStyle={styles.textInput} value={email} onChange={(emailValue) => this.setState({ email: emailValue })} placeholder="Email" />
        <PasswordTextInputRounded propStyle={styles.textInput} value={password} onChange={(passwordValue) => this.setState({ password: passwordValue })} placeholder="Password" />
        <PasswordTextInputRounded propStyle={styles.textInput} value={confirmPassword} onChange={(passwordValue) => this.setState({ confirmPassword: passwordValue })} placeholder="Confirm Password" />
        <BlueButton propStyle={styles.buttonSignUp} func={this.handleSignUp} text="Sign Up" />
        <View style={styles.bottomContainer}>
          <Text style={styles.textLogin}>{ALREADY_HAVE_ACC}</Text>
          <ButtonWhiteBlueBorder func={() => this.navigate('Login')} text="Log In" />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  createUserProfile: PropTypes.func.isRequired,
  clearErrorText: PropTypes.func.isRequired,
  store: PropTypes.objectOf(PropTypes.node).isRequired,
};

const mapStateToProps = (state) => ({
  store: state.registerReducer,
});

const mapDispatchToProps = (dispatch) => ({
  createUserProfile: (nickname, email, password, confirmPassword, usedNicknames) => dispatch(createUser(nickname, email, password, confirmPassword, usedNicknames)),
  clearErrorText: () => dispatch(clearError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

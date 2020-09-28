import React, { Component } from 'react';
import {
  View,
  Text,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles, {
  LOGO_WITHOUT_KEYBOARD_WIDTH,
  LOGO_WITH_KEYBOARD_WIDTH,
  LOGO_WITHOUT_KEYBOARD_HEIGHT,
  LOGO_WITH_KEYBOARD_HEIGHT,
} from './styles.android';
import loginUser, { clearError } from './actions';
import { ButtonWhiteBlueBorder, BlueButton } from '../../components/buttons/index.android';
import { TextInputRounded, PasswordTextInputRounded } from '../../components/inputs/index.android';
import Logo from '../../../assets/Logo.png';

const DONT_HAVE_ACC = 'Don\'t have an account?';
const FORGOT_PASSWORD = 'Forgot Password?';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.imageSizeWidth = new Animated.Value(LOGO_WITHOUT_KEYBOARD_WIDTH);
    this.imageSizeHeight = new Animated.Value(LOGO_WITHOUT_KEYBOARD_HEIGHT);
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    Animated.spring(this.imageSizeWidth, {
      toValue: LOGO_WITH_KEYBOARD_WIDTH,
    }).start();
    Animated.spring(this.imageSizeHeight, {
      toValue: LOGO_WITH_KEYBOARD_HEIGHT,
    }).start();
  };

  _keyboardDidHide = () => {
    Animated.spring(this.imageSizeWidth, {
      toValue: LOGO_WITHOUT_KEYBOARD_WIDTH,
    }).start();
    Animated.spring(this.imageSizeHeight, {
      toValue: LOGO_WITHOUT_KEYBOARD_HEIGHT,
    }).start();
  };

  handleLogin = async () => {
    const { email, password } = this.state;
    const { loginUserProfile, navigation } = this.props;
    loginUserProfile(email, password, navigation);
  }

  navigate(page) {
    const { clearErrorText, navigation } = this.props;
    navigation.navigate(page);
    clearErrorText();
  }

  render() {
    const { email, password } = this.state;
    const { store } = this.props;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <Animated.Image fadeDuration={0} style={[styles.Logo, { height: this.imageSizeHeight, width: this.imageSizeWidth }]} source={Logo} />
        {store.errorLoging && (<Text style={styles.errorMessage}>{store.errorLoging}</Text>)}
        <TextInputRounded propStyle={styles.textInput} value={email} onChange={(emailValue) => this.setState({ email: emailValue })} placeholder="Email" />
        <PasswordTextInputRounded propStyle={styles.textInput} value={password} onChange={(passwordValue) => this.setState({ password: passwordValue })} placeholder="Password" />
        <Text style={styles.linkForgotPassword} onPress={() => this.navigate('ResetPassword')}>{FORGOT_PASSWORD}</Text>
        <BlueButton propStyle={styles.buttonLogin} func={this.handleLogin} text="Login" />
        <View style={styles.bottomContainer}>
          <Text style={styles.textSignUp}>{DONT_HAVE_ACC}</Text>
          <ButtonWhiteBlueBorder func={() => this.navigate('Register')} text="Sign Up" />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginUserProfile: (email, password, navigation) => dispatch(loginUser(email, password, navigation)),
  clearErrorText: () => dispatch(clearError()),
});

const mapStateToProps = (state) => ({
  store: state.loginReducer,
});

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  loginUserProfile: PropTypes.func.isRequired,
  clearErrorText: PropTypes.func.isRequired,
  store: PropTypes.objectOf(PropTypes.node).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

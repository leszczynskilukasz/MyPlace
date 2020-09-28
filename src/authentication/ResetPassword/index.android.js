import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles.android';
import { TextInputRounded } from '../../components/inputs/index.android';
import { BlueButton, ButtonWhiteBlueBorder } from '../../components/buttons/index.android';
import sendResetPassword, { clearError } from './actions';

import logoImage from '../../../assets/Logo.png';

const ENTER_EMAIL = 'Please enter your email';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  sendRequestReset = (email) => {
    const { requestResetPassword, navigation } = this.props;
    requestResetPassword(email, navigation);
  }

  navigate(page) {
    const { clearErrorText, navigation } = this.props;
    navigation.navigate(page);
    clearErrorText();
  }

  render() {
    const { email } = this.state;
    const { store } = this.props;
    return (
      <View style={styles.container}>
        <Image fadeDuration={0} style={styles.logoImage} source={logoImage} />
        <Text style={styles.textInfo}>{ENTER_EMAIL}</Text>
        {store.errorResetPassword
          && (<Text style={styles.errorMessage}>{store.errorResetPassword}</Text>)}
        <TextInputRounded propStyle={styles.textInput} value={email} onChange={(emailValue) => this.setState({ email: emailValue })} placeholder="Email" />
        <BlueButton propStyle={styles.buttonResetPassword} func={() => this.sendRequestReset(email)} text="Reset Password" />
        <View style={styles.bottomContainer}>
          <ButtonWhiteBlueBorder func={() => this.navigate('Login')} text="Log In" />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  store: state.resetPasswordReducer,
});

const mapDispatchToProps = (dispatch) => ({
  requestResetPassword: (email, navigation) => dispatch(sendResetPassword(email, navigation)),
  clearErrorText: () => dispatch(clearError()),
});

ResetPassword.propTypes = {
  requestResetPassword: PropTypes.func.isRequired,
  clearErrorText: PropTypes.func.isRequired,
  store: PropTypes.objectOf(PropTypes.node).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

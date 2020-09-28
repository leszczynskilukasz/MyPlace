import React from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles.android';

export const TextInputRounded = ({
  propStyle,
  value,
  onChange,
  placeholder,
}) => (
  <TextInput
    style={[styles.textInputRounded, propStyle]}
    autoCapitalize="none"
    placeholder={placeholder}
    underlineColorAndroid="transparent"
    onChangeText={onChange}
    value={value}
  />
);

TextInputRounded.defaultProps = {
  propStyle: {},
};

TextInputRounded.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  propStyle: PropTypes.objectOf(PropTypes.node),
};

export const PasswordTextInputRounded = ({
  propStyle,
  value,
  onChange,
  placeholder,
}) => (
  <TextInput
    style={[styles.textInputRounded, propStyle]}
    secureTextEntry
    autoCapitalize="none"
    placeholder={placeholder}
    underlineColorAndroid="transparent"
    onChangeText={onChange}
    value={value}
  />
);

PasswordTextInputRounded.defaultProps = {
  propStyle: {},
};

PasswordTextInputRounded.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  propStyle: PropTypes.objectOf(PropTypes.node),
};

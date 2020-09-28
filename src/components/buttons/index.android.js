import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles.android';

export const ButtonWhiteBlueBorder = ({
  propStyle, func, text, disabled,
}) => (
  <TouchableOpacity
    disabled={disabled}
    style={[styles.buttonWhiteBlueBorder, propStyle]}
    onPress={func}
  >
    <Text style={styles.textButtonWhiteBlueBorder}>{text}</Text>
  </TouchableOpacity>
);
ButtonWhiteBlueBorder.defaultProps = {
  propStyle: {},
  disabled: false,
};

ButtonWhiteBlueBorder.propTypes = {
  func: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  propStyle: PropTypes.objectOf(PropTypes.node),
  disabled: PropTypes.bool,
};

export const BlueButton = ({
  propStyle, func, text, disabled,
}) => (
  <TouchableOpacity
    disabled={disabled}
    style={[styles.blueButton, propStyle]}
    onPress={func}
  >
    <Text style={styles.textBlueButton}>{text}</Text>
  </TouchableOpacity>
);

BlueButton.defaultProps = {
  propStyle: {},
  disabled: false,
};

BlueButton.propTypes = {
  func: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  propStyle: PropTypes.objectOf(PropTypes.node),
  disabled: PropTypes.bool,
};

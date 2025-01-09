import React from "react";
import { Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { AppColors } from "../colors/AppColors";

export default function CustomOrangeButton({ title, onPress, disabled, buttonStyle, ...rest }) {
  return (
    <Button
      mode="contained"
      rippleColor={'transparent'}
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
      {...rest}
    >
      <Text style={[styles.buttonText, buttonStyle]}>{title}</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColors.buttonColor,
    paddingVertical: 4,
  },
  disabledButton: {
    backgroundColor: AppColors.buttonColor,
    opacity: 0.5,
  },

  buttonText: {
    fontFamily: "Nunito-Black",
    fontSize: 16,
    color: "#fff",
    textTransform: "uppercase",
  },
});

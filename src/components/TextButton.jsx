import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { AppColors } from "../colors/AppColors";

export default function TextButton({ title, onPress }) {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={{marginTop: 16}}>
      <Text style={styles.textButton}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textButton: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: 14,
    textAlign: "center",
    color: AppColors.buttonColor
  },
});

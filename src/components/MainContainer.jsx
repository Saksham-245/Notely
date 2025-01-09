import React from "react";
import { StyleSheet, View } from "react-native";
import { AppColors } from "../colors/AppColors";

export default function MainContainer({ children, mainContainerStyle }) {
  return <View style={[styles.container, mainContainerStyle]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.scaffoldBackgroundColor,
  },
});

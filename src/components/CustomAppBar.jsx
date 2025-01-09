import React from "react";
import { Appbar } from "react-native-paper";
import { AppColors } from "../colors/AppColors";
import { StyleSheet } from "react-native";

export default function CustomAppBar({ title = 'Notely', titleStyle = {}, showContent = false, appContent = false, leftContent = null, rightContent = null  }) {
  return (
    <Appbar.Header safeAreaInsets={{ bottom: 0 }} style={styles.appBar}>
      {leftContent}
      {showContent ? appContent : <Appbar.Content title={title} titleStyle={[styles.appBarContent, titleStyle]} />}
      {rightContent}
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: AppColors.scaffoldBackgroundColor,
  },
  appBarContent: {
    textAlign: "center",
    fontFamily: "Titan-One",
    width: "100%",
    color: AppColors.textColor,
  },
});

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { AppColors } from '../colors/AppColors';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={AppColors.buttonColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.scaffoldBackgroundColor,
  },
});

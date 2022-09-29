import React from 'react';
import {StyleSheet, Text} from 'react-native';
import AppView from '../components/AppView';
import Header from '../components/Header';
export const SignUpScreen = () => {
  return (
    <AppView>
      <Header />
      <Text style={styles.text}>Sign Up Screen</Text>
    </AppView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});

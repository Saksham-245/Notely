import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';

const AppView = ({children}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#F8EEE2'} />
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8EEE2',
    alignItems: 'center',
  },
});

export default AppView;

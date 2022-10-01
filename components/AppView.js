import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const AppView = ({children, root}) => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#F8EEE2'} />
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, root && root]}>{children}</View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8EEE2',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8EEE2',
    marginTop: 16,
  },
});

export default AppView;

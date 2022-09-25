import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const FirstScreen = () => {
  return (
    <>
      <Text style={styles.header}>Notely</Text>
      <View style={{height: 118}} />
      <View style={styles.body}>
        <Image source={require('../images/logo.png')} />
      </View>
      <View style={styles.body2}>
        <Text style={styles.textHeading}>
          World’s Safest And {'\n'}
          Largest Digital Notebook
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'TitanOne',
    fontWeight: '400',
    color: '#403B36',
    lineHeight: 22.93,
  },
  body: {
    flex: 1,
    marginLeft: 54,
    marginRight: 53,
    marginBottom: 28,
  },
  body2: {
    marginLeft: 34,
    marginRight: 33,
  },
  textHeading: {
    fontFamily: 'Nunito',
    fontWeight: '900',
    fontSize: 24,
    lineHeight: 32.74,
    textAlign: 'center',
  },
});

export default FirstScreen;

import React from 'react';
import {Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const Header = () => {
  return <Text style={styles.header}>Notely</Text>;
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
});

export default Header;

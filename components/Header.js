import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Header = ({title = 'Notely'}) => {
  return <Text style={styles.header}>{title}</Text>;
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

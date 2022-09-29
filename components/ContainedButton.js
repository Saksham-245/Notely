import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const ContainedButton = ({onClick, title}) => {
  return (
    <View style={styles.containerButton}>
      <TouchableOpacity onPress={onClick} style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerButton: {
    marginHorizontal: scale(28),
  },
  button: {
    backgroundColor: '#D9614C',
    borderRadius: scale(12),
    alignItems: 'center',
    width: scale(319),
    marginHorizontal: scale(28),
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(24),
  },
  buttonText: {
    color: 'white',
    fontFamily: 'nunito',
    fontWeight: '900',
    textTransform: 'uppercase',
    fontSize: scale(20),
    lineHeight: scale(26),
    textAlign: 'center',
  },
});

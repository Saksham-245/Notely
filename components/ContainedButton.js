import * as React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export const ContainedButton = ({onClick, title}) => {
  return (
    <View style={styles.containerButton}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClick}
        style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerButton: {
    marginHorizontal: 28,
  },
  button: {
    backgroundColor: '#D9614C',
    borderRadius: 12,
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.88,
    marginHorizontal: 28,
    paddingVertical: Dimensions.get('window').height * 0.02,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'nunito',
    fontWeight: '900',
    fontSize: Dimensions.get('window').fontScale * 20,
    letterSpacing: Dimensions.get('window').width * 0.01,
    textAlign: 'center',
  },
});

import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AppView from '../components/AppView';
import Header from '../components/Header';
import {ContainedButton} from '../components/ContainedButton';

const FirstScreen = ({navigation}) => {
  return (
    <AppView root={styles.root}>
      <Header />
      <View style={styles.sizedBox} />
      <View style={styles.imageContainer}>
        <Image source={require('../images/logo.png')} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textHeading}>
          World’s Safest And {'\n'}
          Largest Digital Notebook
        </Text>
        <Text style={styles.paragraph}>
          Notely is the world’s safest, largest and{'\n'} intelligent digital
          notebook. Join over {'\n'} 10M+ users already using Notely.
        </Text>
      </View>
      <View style={styles.sizedBox2} />
      <ContainedButton
        title={'Get Started'}
        buttonLabel={styles.buttonLabel}
        onClick={() => {
          navigation.replace('SignUpScreen');
        }}
      />

      <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
        <Text style={styles.textLabel}>Already Have an Account?</Text>
      </TouchableOpacity>
    </AppView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  sizedBox: {
    height: Dimensions.get('window').height * 0.16,
  },
  imageContainer: {
    marginHorizontal: 34,
  },
  textContainer: {
    width: 319,
  },
  sizedBox2: {
    height: Dimensions.get('window').height * 0.06,
  },
  body: {
    flex: 1,
    marginHorizontal: Dimensions.get('window').width * 0.4,
    marginBottom: 28,
  },
  body2: {
    marginHorizontal: 34,
  },
  textHeading: {
    marginTop: 28,
    fontFamily: 'Nunito-Black',
    fontSize: Dimensions.get('window').fontScale * 24,
    color: 'black',
    lineHeight: 32.74,
    textAlign: 'center',
  },
  paragraph: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: Dimensions.get('window').fontScale * 16,
    color: '#595550',
    fontFamily: 'Nunito-Bold',
    lineHeight: 20.8,
  },
  textLabel: {
    color: '#D9614C',
    marginVertical: Dimensions.get('window').height * 0.03,
    fontFamily: 'Nunito-ExtraBold',
    fontSize: Dimensions.get('window').fontScale * 16,
    textAlign: 'center',
    lineHeight: 20.8,
  },
  buttonLabel: {
    textTransform: 'uppercase',
  },
});

export default FirstScreen;

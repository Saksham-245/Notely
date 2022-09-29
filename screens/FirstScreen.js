import React from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import AppView from '../components/AppView';
import Header from '../components/Header';
import {scale, verticalScale} from 'react-native-size-matters';
import {ContainedButton} from '../components/ContainedButton';

const FirstScreen = ({navigation}) => {
  return (
    <AppView>
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
        onClick={() => {
          navigation.navigate('SignUpScreen');
        }}
      />
      <TouchableOpacity>
        <Text style={styles.textLabel}>Already Have an Account?</Text>
      </TouchableOpacity>
    </AppView>
  );
};

const styles = StyleSheet.create({
  sizedBox: {
    height: verticalScale(80),
  },
  imageContainer: {
    marginHorizontal: scale(34),
  },
  textContainer: {
    width: scale(308),
  },
  sizedBox2: {
    height: verticalScale(50),
  },
  body: {
    flex: 1,
    marginHorizontal: scale(54),
    marginBottom: scale(28),
  },
  body2: {
    marginHorizontal: scale(34),
  },
  textHeading: {
    marginTop: scale(28),
    fontFamily: 'nunito',
    fontWeight: '900',
    fontSize: scale(24),
    color: 'black',
    lineHeight: scale(32.74),
    textAlign: 'center',
  },
  paragraph: {
    textAlign: 'center',
    marginTop: scale(12),
    fontSize: scale(16),
    color: '#595550',
    fontWeight: '700',
    fontFamily: 'nunito',
    lineHeight: scale(20.8),
  },
  textLabel: {
    color: '#D9614C',
    marginVertical: verticalScale(20),
    fontFamily: 'nunito',
    fontSize: scale(16),
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: scale(20.8),
  },
});

export default FirstScreen;

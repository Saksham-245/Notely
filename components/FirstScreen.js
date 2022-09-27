import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import AppView from './AppView';
import Header from './Header';

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
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabel}
        onPress={() => {
          navigation.navigate('SignUpScreen');
        }}>
        Get Started
      </Button>
      <Button
        labelStyle={styles.textLabel}
        onPress={() => {
          console.log('Text Button');
        }}>
        Already Have an Account?
      </Button>
      {/*<View style={styles.button}>*/}
      {/*  <Text*/}
      {/*    style={{*/}

      {/*    }}>*/}
      {/*    Get Started*/}
      {/*  </Text>*/}
      {/*</View>*/}
      {/*<Text*/}
      {/*  style={{*/}
      {/*    marginTop: 28,*/}
      {/*  }}>*/}
      {/*  Already have an account?*/}
      {/*</Text>*/}
    </AppView>
  );
};

const styles = StyleSheet.create({
  sizedBox: {
    height: 118,
  },
  imageContainer: {
    marginLeft: 33,
    marginRight: 34,
  },
  textContainer: {
    marginLeft: 34,
    marginRight: 33.5,
  },
  sizedBox2: {
    height: 50,
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
    marginTop: 28,
    fontFamily: 'nunito',
    fontWeight: '900',
    fontSize: 24,
    color: 'black',
    lineHeight: 32.74,
    textAlign: 'center',
  },
  paragraph: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
    color: '#595550',
    fontWeight: '700',
    fontFamily: 'nunito',
    lineHeight: 20.8,
  },
  button: {
    backgroundColor: '#D9614C',
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 28,
  },
  buttonLabel: {
    fontFamily: 'nunito',
    fontWeight: '900',
    textTransform: 'uppercase',
    fontSize: 20,
    marginVertical: 24,
    marginHorizontal: 96,
  },
  textLabel: {
    color: '#D9614C',
    marginVertical: 20,
    fontFamily: 'nunito',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 20.8,
  },
});

export default FirstScreen;

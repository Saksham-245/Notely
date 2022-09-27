import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import AppView from './AppView';

const FirstScreen = ({navigation}) => {
  return (
    <AppView>
      <Text style={styles.header}>Notely</Text>
      <View style={{height: 118}} />
      <View
        style={{
          marginLeft: 33,
          marginRight: 34,
        }}>
        <Image source={require('../images/logo.png')} />
      </View>
      <View
        style={{
          marginLeft: 34,
          marginRight: 33.5,
        }}>
        <Text style={styles.textHeading}>
          World’s Safest And {'\n'}
          Largest Digital Notebook
        </Text>
        <Text style={styles.paragraph}>
          Notely is the world’s safest, largest and{'\n'} intelligent digital
          notebook. Join over {'\n'} 10M+ users already using Notely.
        </Text>
      </View>
      <View
        style={{
          height: 50,
        }}
      />
      <Button
        style={styles.button}
        mode={'contained'}
        onPress={() => {
          navigation.navigate('SignUpScreen');
        }}>
        Get Started
      </Button>
      {/*<View style={styles.button}>*/}
      {/*  <Text*/}
      {/*    style={{*/}
      {/*      color: 'white',*/}
      {/*      fontSize: 20,*/}
      {/*      fontWeight: '900',*/}
      {/*      textAlign: 'center',*/}
      {/*      fontFamily: 'nunito',*/}
      {/*      lineHeight: 26,*/}
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
  header: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'TitanOne',
    fontWeight: '400',
    color: '#403B36',
    marginTop: 18,
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
    paddingHorizontal: 50,
    paddingVertical: 20,
    fontSize: 20,
    fontWeight: '900',
    fontFamily: 'nunito',
    lineHeight: 26,
  },
});

export default FirstScreen;

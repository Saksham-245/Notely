import React, {useEffect, useRef} from 'react';
import AppView from '../components/AppView';
import {StyleSheet, View} from 'react-native';
import Lottie from 'lottie-react-native';

export const SplashScreen = ({navigation}) => {
  let user = true;
  const ref = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('SignUpScreen');
      // if (user) {
      //   navigation.replace('SignUpScreen');
      // } else {
      //   navigation.replace('FirstScreen');
      // }
    }, 5000);
  });

  return (
    <AppView>
      <View style={styles.root}>
        <Lottie
          source={require('../assets/splash/splash.json')}
          autoPlay
          style={styles.lottieView}
          loop={false}
          ref={animation => (ref.current = animation)}
        />
      </View>
    </AppView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieView: {
    width: '100%',
  },
});

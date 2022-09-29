import React, {useEffect, useRef, useState} from 'react';
import AppView from '../components/AppView';
import {StyleSheet, View} from 'react-native';
import Lottie from 'lottie-react-native';

export const SplashScreen = ({navigation}) => {
  const [authLoaded, setAuthLoaded] = useState(false);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const ref = useRef(null);

  const onAnimationFinish = () => {
    setAnimationLoaded(true);
  };
  useEffect(() => {
    setTimeout(() => {
      setAuthLoaded(true);
    }, 5000);
  }, []);

  useEffect(() => {
    if (authLoaded && animationLoaded) {
      navigation.replace('FirstScreen');
    }
  }, [authLoaded, animationLoaded, navigation]);

  return (
    <AppView>
      <View style={styles.root}>
        <Lottie
          source={require('../assets/splash/splash.json')}
          autoPlay
          style={styles.lottieView}
          loop={false}
          ref={animation => (ref.current = animation)}
          onAnimationFinish={onAnimationFinish}
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

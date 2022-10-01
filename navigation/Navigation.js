import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import FirstScreen from '../screens/FirstScreen';
import {SplashScreen} from '../screens/SplashScreen';
import {SignUpScreen} from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="SplashScreen">
        <Stack.Screen name={'SplashScreen'} component={SplashScreen} />
        <Stack.Screen name={'FirstScreen'} component={FirstScreen} />
        <Stack.Screen name={'SignUpScreen'} component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

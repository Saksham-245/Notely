import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import FirstScreen from '../screens/FirstScreen';
import {SignUpScreen} from '../screens/SignUpScreen';
import {SplashScreen} from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name={'SplashScreen'}
          component={SplashScreen}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name={'FirstScreen'}
          component={FirstScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'SignUpScreen'}
          component={SignUpScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

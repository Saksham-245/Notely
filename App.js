import React from 'react';
import AppView from './components/AppView';
import FirstScreen from './components/firstScreen';
import {SafeAreaView} from 'react-native';

const App = () => {
  return (
    <AppView>
      <FirstScreen />
    </AppView>
  );
};

export default App;

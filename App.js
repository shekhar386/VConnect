/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {LoginStackNavigator} from "./src/navigators/StackNavigator";



const App = () => {

  return (
      <NavigationContainer>
        <LoginStackNavigator />
      </NavigationContainer>
  );
};



export default App;

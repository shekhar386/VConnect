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
import {Provider, useSelector} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {HomeTabNavigator} from "./src/navigators/TabNavigator";
import {persistor, store} from "./src/store/store";

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <LoginStackNavigator />
        </NavigationContainer>
    );
};

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <AppNavigator />
            </PersistGate>
        </Provider>
    );
};



export default App;

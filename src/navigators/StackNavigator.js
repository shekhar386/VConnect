import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from "../screens/auth/AuthScreen";
import UserDetailsScreen from "../screens/auth/UserDetailsScreen";
import {HomeTabNavigator} from "./TabNavigator";

const Stack = createStackNavigator();

const LoginStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="UserDetailsScreen" component={UserDetailsScreen} />
            <Stack.Screen name="Home" component={HomeTabNavigator} />
        </Stack.Navigator>
    );
};

export {LoginStackNavigator};

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from "../screens/auth/AuthScreen";
import UserDetailsScreen from "../screens/auth/UserDetailsScreen";
import {HomeTabNavigator} from "./TabNavigator";
import AddPostScreen from "../screens/AddPostScreen";
import OtherProfileScreen from "../screens/OtherProfileScreen";

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
            <Stack.Screen name="AddPostScreen" component={AddPostScreen} />
            <Stack.Screen name="OtherProfileScreen" component={OtherProfileScreen} />
        </Stack.Navigator>
    );
};

export {LoginStackNavigator};

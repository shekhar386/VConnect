import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from "../screens/auth/AuthScreen";
import UserDetailsScreen from "../screens/auth/UserDetailsScreen";
import {HomeTabNavigator} from "./TabNavigator";
import AddPostScreen from "../screens/AddPostScreen";
import OtherProfileScreen from "../screens/OtherProfileScreen";
import FriendListScreen from "../screens/FriendListScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import LikeScreen from "../screens/LikeScreen";
import ShareCreateScreen from "../screens/ShareCreateScreen";

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
            <Stack.Screen name="FriendListScreen" component={FriendListScreen} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
            <Stack.Screen name="LikeScreen" component={LikeScreen} />
            <Stack.Screen name="ShareCreateScreen" component={ShareCreateScreen} />
        </Stack.Navigator>
    );
};

export {LoginStackNavigator};

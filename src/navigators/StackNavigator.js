import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from "../screens/auth/AuthScreen";
import UserDetailsScreen from "../screens/auth/UserDetailsScreen";
import { HomeTabNavigator } from "./TabNavigator";
import AddPostScreen from "../screens/AddPostScreen";
import OtherProfileScreen from "../screens/OtherProfileScreen";
import FriendListScreen from "../screens/FriendListScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import LikeScreen from "../screens/LikeScreen";
import ShareCreateScreen from "../screens/ShareCreateScreen";
import SettingScreen from '../screens/SettingScreen';
import Colors from '../constants/Colors';
import ShareScreen from '../screens/ShareScreen';

const Stack = createStackNavigator();

const LoginStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserDetailsScreen" component={UserDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="AddPostScreen" component={AddPostScreen} options={{
                title: 'Create Post',
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTitleStyle: {
                    color: 'white',
                }
            }} />
            <Stack.Screen name="OtherProfileScreen" component={OtherProfileScreen} options={{
                title: 'Profile',
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTitleStyle: {
                    color: 'white',
                }
            }} />
            <Stack.Screen name="FriendListScreen" component={FriendListScreen} options={{
                title: 'Friends',
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTitleStyle: {
                    color: 'white',
                }
            }} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{
                title: 'Edit Profile',
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTitleStyle: {
                    color: 'white',
                }
            }} />
            <Stack.Screen name="LikeScreen" component={LikeScreen} options={{
                title: 'Liked By',
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTitleStyle: {
                    color: 'white',
                }
            }} />
            <Stack.Screen name="ShareScreen" component={ShareScreen} options={{
                title: 'Shared By',
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTitleStyle: {
                    color: 'white',
                }
            }} />
            <Stack.Screen name="ShareCreateScreen" component={ShareCreateScreen} options={{
                title: 'Share Post',
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTitleStyle: {
                    color: 'white',
                }
            }} />
            <Stack.Screen name="SettingScreen" component={SettingScreen} />
        </Stack.Navigator>
    );
};

export { LoginStackNavigator };

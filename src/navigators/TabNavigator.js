import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AllPostsScreen from "../screens/home/AllPostsScreen";
import {SearchScreen} from "../screens/home/SearchScreen";
import {NotificationsScreen} from "../screens/home/NotificationsScreen";
import ProfileScreen from "../screens/home/ProfileScreen";
import Colors from "../constants/Colors";
import {Text, TouchableOpacity} from "react-native";

const Tab = createBottomTabNavigator();

export const HomeTabNavigator = (props) => {

    return (
        <Tab.Navigator screenOptions={{tabBarActiveTintColor: Colors.primary}}>
            <Tab.Screen
                name="Feed"
                options={{
                    title: 'Feed',
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTitleStyle: {
                        color: 'white',
                    },
                    headerRight: () => (
                        <TouchableOpacity onPress={() => {props.navigation.navigate('AddPostScreen')}}>
                            <Text style={{marginHorizontal: 20, color: 'white'}}>Add Post</Text>
                        </TouchableOpacity>
                    )
                }}
                component={AllPostsScreen}
            />
            <Tab.Screen
                options={{
                    title: 'Search',
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTitleStyle: {
                        color: 'white',
                    },
                }}
                name="Search"
                component={SearchScreen}
            />
            <Tab.Screen
                options={{
                    title: 'Notifications',
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTitleStyle: {
                        color: 'white',
                    },
                }}
                name="Notifications"
                component={NotificationsScreen}
            />
            <Tab.Screen
                options={{
                    title: 'Profile',
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTitleStyle: {
                        color: 'white',
                    },
                }}
                name="Profile"
                component={ProfileScreen}
            />
        </Tab.Navigator>
    );
};

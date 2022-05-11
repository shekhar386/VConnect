import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AllPostsScreen from "../screens/home/AllPostsScreen";
import SearchScreen from "../screens/home/SearchScreen";
import NotificationScreen from "../screens/home/NotificationsScreen";
import ProfileScreen from "../screens/home/ProfileScreen";
import Colors from "../constants/Colors";
import {Text, TouchableOpacity} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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
                    headerRight: ({focused, size}) => (
                        <TouchableOpacity
                            style={{marginRight: 10}}
                            onPress={() => {
                            //dispatch(logout());
                            props.navigation.navigate('AddPostScreen');
                            }}>
                            <MaterialCommunityIcons
                                name="plus-box-outline"
                                size={30}
                                color={focused ? Colors.primary : '#ccc'}
                            />
                        </TouchableOpacity>
                    ),
                    tabBarIcon: ({focused, size}) => (
                        <MaterialCommunityIcons
                            name="home"
                            size={size}
                            color={focused ? Colors.primary : '#ccc'}
                        />
                    ),
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
                    tabBarIcon: ({focused, size}) => (
                        <MaterialCommunityIcons
                            name="account-search"
                            size={size}
                            color={focused ? Colors.primary : '#ccc'}
                        />
                    ),
                }}
                name="SearchScreen"
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
                    tabBarIcon: ({focused, size}) => (
                        <MaterialCommunityIcons
                            name="bell"
                            size={size}
                            color={focused ? Colors.primary : '#ccc'}
                        />
                    ),
                }}
                name="NotificationScreen"
                component={NotificationScreen}
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
                    tabBarIcon: ({focused, size}) => (
                        <MaterialCommunityIcons
                            name="account"
                            size={size}
                            color={focused ? Colors.primary : '#ccc'}
                        />
                    ),
                }}
                name="Profile"
                component={ProfileScreen}
            />
        </Tab.Navigator>
    );
};

import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllPostsScreen from "../screens/home/AllPostsScreen";
import SearchScreen from "../screens/home/SearchScreen";
import NotificationScreen from "../screens/home/NotificationsScreen";
import ProfileScreen from "../screens/home/ProfileScreen";
import Colors from "../constants/Colors";
import { TouchableOpacity, View, Text, Modal, Alert } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { logout } from '../store/reducers/userReducer';

const Tab = createBottomTabNavigator();



export const HomeTabNavigator = (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(false);
    }, [isLoading, modalVisible]);


    if (isLoading) {
        return (
            <Text>Loading...</Text>
        )
    }
    else {
        return (
            <>
                <Modal
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} >
                        <TouchableOpacity
                            style={{ width: '100%' }}
                            onPress={() => {
                                setModalVisible(false);
                            }}>
                            <IconButton
                                icon="chevron-down"
                                color={'black'}
                                size={20}
                                style={{ alignSelf: 'center', justifyContent: 'center' }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() =>
                            Alert.alert(
                                'Log out',
                                'Do you want to logout?',
                                [
                                    { text: 'Cancel', onPress: () => { return null } },
                                    {
                                        text: 'Confirm', onPress: () => {
                                            dispatch(logout());
                                            props.navigation.navigate('Auth');
                                        }
                                    },
                                ],
                                { cancelable: false }
                            )
                        }>
                            <Text style={{ margin: 16, fontWeight: 'bold', color: 'black' }}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() =>
                            props.navigation.navigate('SettingScreen')
                        }>
                            <Text style={{ margin: 16, fontWeight: 'bold', color: 'black' }}>Settings</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Tab.Navigator screenOptions={{ tabBarActiveTintColor: Colors.primary }}>
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
                            headerRight: ({ focused, size }) => (
                                <TouchableOpacity
                                    style={{ marginRight: 10 }}
                                    onPress={() => {
                                        props.navigation.navigate('AddPostScreen');
                                    }}>
                                    <MaterialCommunityIcons
                                        name="plus-box-outline"
                                        size={30}
                                        color={focused ? Colors.primary : '#ccc'}
                                    />
                                </TouchableOpacity>
                            ),
                            tabBarIcon: ({ focused, size }) => (
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
                            tabBarIcon: ({ focused, size }) => (
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
                            tabBarIcon: ({ focused, size }) => (
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
                            headerRight: ({ focused, size }) => (
                                <TouchableOpacity
                                    style={{ marginRight: 10 }}
                                    onPress={() => {
                                        setModalVisible(true);
                                        setIsLoading(true);
                                    }}>
                                    <MaterialCommunityIcons
                                        name="menu"
                                        size={30}
                                        color={focused ? Colors.primary : '#ccc'}
                                    />
                                </TouchableOpacity>
                            ),
                            tabBarIcon: ({ focused, size }) => (
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
            </>
        );
    }
};

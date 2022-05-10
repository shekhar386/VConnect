import React, {useEffect, useState} from "react";
import {
    allPost, confirmRequest,
    likePost,
    requestUserData,
    unlikePost,
    userAuth,
    userMe,
    userOther,
    userSearch
} from "../../apiCalls/apiCalls";
import {
    ActivityIndicator, Alert, Dimensions,
    FlatList,
    Image, Modal,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {addUser, login} from "../../store/reducers/userReducer";
import UserDetailsScreen from "../auth/UserDetailsScreen";
import {Badge, IconButton} from "react-native-paper";
import Colors from "../../constants/Colors";
import {windowWidth} from "../../services/Dimensions";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const NotificationScreen = (props) => {

    const [data, setData] = useState([]);
    const [requestData, setRequestData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [notificationData, setNotificationData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const loadData = async () => {
        try {
            const data1 = await userMe();
            const data2 = await requestUserData(data1[0].friendRequest);
            if(data1 && data2){
                setData(data1);
                setRequestData(data2);
                setNotificationData(data1[0].notification.reverse());
                setIsLoading(false)
            }
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        loadData();
    }, [data.length === 0, requestData.length === 0, isLoading])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setIsLoading(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const Item = ({user}) => (
        <View
            style={{
                borderColor: "#ccc",
                elevation: 1,
                flex: 1,
                padding: 10
            }}>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    style={{flexDirection: 'row', flex: 3}}
                    onPress={() => {
                    setRequestData([])
                    props.navigation.navigate('OtherProfileScreen', {
                        userData: user.item.email,
                        userId: user.item._id,
                    })
                }}>
                    <Image
                        source={{uri: user.profilePic}}
                        style={{ width: 35, height: 35, borderRadius: 37.5, backgroundColor: "#c2c2c2" }}
                    />
                    <View style={{marginHorizontal: 10}}>
                        <Text style={{color: 'black'}}>{user.name}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ alignSelf: 'flex-end',}}>
                    <TouchableOpacity
                        onPress={() => {
                            confirmRequest(user._id);
                            setIsLoading(true);
                        }}
                        bordered
                        dark
                        style={{
                            justifyContent: 'center',
                            height: 40,
                            width: 100,
                            marginRight: 10,
                            alignItems: 'center',
                            backgroundColor: Colors.primary }}
                    >
                        <Text style={{color: 'white', }}>Confirm Request</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const NotificationItem = ({notification}) => (
        <View
            style={{
                borderColor: "#ccc",
                elevation: 1,
                width: windowWidth,
                flex: 1,
                padding: 10
            }}>
            <View style={{flexDirection: 'row'}}>
                <View style={{marginHorizontal: 10}}>
                    {(notification.type === 1) && (
                        <Text style={{color: 'black'}}>{notification.uName} has liked your post.</Text>
                    )}
                    {(notification.type === 2) && (
                        <Text style={{color: 'black'}}>{notification.uName} has commented on your post.</Text>
                    )}
                    {(notification.type === 3) && (
                        <Text style={{color: 'black'}}>{notification.uName} has shared your post.</Text>
                    )}
                </View>
            </View>
        </View>
    );

    const renderItem = (user) => {
        return (
            <Item user = {user.item} />

        );
    }

    const renderNotificationItem = (user) => {
        return (
            <NotificationItem notification = {user.item} />

        );
    }

    {
        if(!isLoading) {
            return (
                <SafeAreaView style={{padding: 10}}>
                    <View style={styles.screen}>
                        <Modal
                            animationType="slide"
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                                setRequestData([]);
                            }}>
                            <View style={styles.screen} >
                                <TouchableOpacity
                                    style={{width: '100%'}}
                                    onPress={() => {
                                        setRequestData([]);
                                        setModalVisible(false);
                                    }}>
                                    <IconButton
                                        icon="chevron-down"
                                        color={'black'}
                                        size={20}
                                        style={{ alignSelf: 'center', justifyContent: 'center'}}
                                    />
                                </TouchableOpacity>
                                <FlatList
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={onRefresh}
                                        />
                                    }
                                    style={styles.list}
                                    data={requestData}
                                    keyExtractor={(user) => user._id }
                                    ItemSeparatorComponent={() => {
                                        return (
                                            <View style={styles.separator} />
                                        )
                                    }}
                                    renderItem={renderItem}
                                />
                            </View>
                        </Modal>
                        <View style={{marginTop: 55}}>
                            <TouchableOpacity
                                style={[styles.buttonContainer, styles.requestNotificationButton]}
                                onPress={() => {setModalVisible(true)}}
                            >
                                <Text style={styles.requestNotificationText}>
                                    Friend Requests
                                </Text>
                                <View style={{
                                    marginLeft: 60,
                                    height: 25,
                                    width: 25,
                                    borderRadius: 20,
                                    backgroundColor: 'red',
                                    justifyContent: 'center',
                                }}>
                                    <Text style={{color: 'white', alignSelf: 'center'}}>{data[0].friendRequest.length}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                    />
                                }
                                style={styles.list}
                                data={notificationData}
                                keyExtractor={(user) => user.item }
                                ItemSeparatorComponent={() => {
                                    return (
                                        <View style={styles.separator} />
                                    )
                                }}
                                renderItem={renderNotificationItem}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            );
        }
        else {
           return (
               <SafeAreaView style={{padding: 10}}>
                   <View style={styles.screen}>
                   </View>
               </SafeAreaView>
           );
        }
    }
};

const styles = StyleSheet.create({
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: 300,
        borderRadius: 30,
        backgroundColor: 'transparent'
    },
    requestNotificationButton: {
        backgroundColor: "#00b5ec",

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
    },
    requestNotificationText: {
        color: 'white',
        marginLeft: 100,
    },
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        width: '100%',
        height: '100%',
    },
    separator: {
        marginTop: 10,
    },
    like: {
        height: 20,
        width: 20,
        borderRadius: 20,
        backgroundColor: '#2ff7dc',
    },
    inputContainer: {
        // borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        // borderBottomWidth: 1,
        width: 300,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})

export default NotificationScreen;


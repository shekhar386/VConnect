import React, {useEffect, useState} from "react";
import {
    FlatList,
    Image,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {requestUserData, userMe} from "../apiCalls/apiCalls";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const FriendListScreen = (props) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadData = async () => {
        try {
            const data1 = await requestUserData(props.route.params.friendList);
            if(data1){
                setData(data1);
                setIsLoading(false)
            }
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        loadData();
    }, [data.length === 0, isLoading])

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
                <Image
                    source={{uri: user.profilePic}}
                    style={{ width: 35, height: 35, borderRadius: 37.5, backgroundColor: "#c2c2c2" }}
                />
                <View style={{marginHorizontal: 10}}>
                    <Text style={{color: 'black'}}>{user.name}</Text>
                </View>
            </View>
        </View>
    );

    const renderItem = (user) => {
        return (
            <TouchableOpacity onPress={() => {
                props.navigation.navigate('OtherProfileScreen', {
                    userId: user.item._id,
                })
            }}>
                <Item user = {user.item} />
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView style={{padding: 10}}>
            <View style={styles.screen} >
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    style={styles.list}
                    data={data}
                    keyExtractor={(user) => user._id }
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={styles.separator} />
                        )
                    }}
                    renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
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

export default FriendListScreen;

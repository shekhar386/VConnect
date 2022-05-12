import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity, FlatList, RefreshControl
} from "react-native";
import {requestUserData} from "../apiCalls/apiCalls";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const LikeScreen = (props) => {

    const [requestData, setRequestData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadData = async () => {
        try {
            const data1 = await requestUserData(props.route.params.likeList);
            if(data1){
                setRequestData(data1.reverse());
                setIsLoading(false)
            }
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        loadData();
    }, [requestData.length === 0, isLoading])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const LikesItem = ({user}) => (
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
                            userId: user._id,
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
            </View>
        </View>
    );

    const renderLikesItem = (user) => {
        return (
            <LikesItem user = {user.item} />

        );
    }

    if(isLoading) {
        return (
            <Text>Loading...</Text>
        );

    } else {
        return(
            <View style={styles.screen}>
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
                    renderItem={renderLikesItem}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleContainer: {
        marginTop: 40,
        marginBottom: 40,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 22,
        color: 'black',
        textShadowOffset: {width: 0,height: 1},
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    list: {
        width: '95%',
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
});

export default LikeScreen;

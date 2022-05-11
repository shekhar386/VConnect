import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity, FlatList, RefreshControl, Modal
} from "react-native";
import Colors from "../../constants/Colors";
import {confirmRequest, likePost, requestUserData, unlikePost, userMe, userPost} from "../../apiCalls/apiCalls";
import {useDispatch} from "react-redux";
import {logout} from "../../store/reducers/userReducer";
import Video from "react-native-video";
import {IconButton} from "react-native-paper";
import {Friends} from "../FriendListScreen";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


const ProfileScreen = (props) => {

    const [data, setData] = useState([]);
    const [postData, setPostData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadData = async () => {
       try {
           const data1 = await userMe();
           const data2 = await userPost();
           if(data1 && data2){
               setData(data1);
               setPostData(data2);
               setIsLoading(false)
           }
       } catch(e) {
           console.log(e);
       }
    }

    useEffect(() => {
        loadData();
    }, [data.length === 0, postData.length === 0, isLoading])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setPostData([]);
        wait(2000).then(() => setRefreshing(false));
    }, []);


    const Item = ({post}) => (
        <View
            style={{
                borderColor: "#ccc",
                elevation: 2,
                flex: 1,
                padding: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
                <Image
                    source={{uri: data[0].profilePic}}
                    style={{ width: 35, height: 35, borderRadius: 37.5, backgroundColor: "#c2c2c2" }}
                />
                <View style={{flexDirection: 'column', marginHorizontal: 10}}>
                    <Text style={{color: 'black'}}>{data[0].name}</Text>
                    <Text style={{color: '#7c7878'}}>{post.dateAdded}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'column', marginTop: 10}}>
                <Text style={{color: 'black', marginBottom: 5}}>{post.body}</Text>
                {(post.picture !== "NA") && (
                (post.mediaType === 'i') ?
                    <Image
                        style={{height: 200, width: 310, marginBottom: 10, alignSelf: 'center'}}
                        source={{uri: post.picture}}
                    />
                    :
                    <Video
                        style={{height: 200, width: 310, marginBottom: 10, alignSelf: 'center'}}
                        resizeMode={'cover'}
                        repeat={true}
                        source={{uri: post.picture}}
                    />
                )}
                <View style={{flexDirection: 'row', marginTop: 2, alignSelf: 'center'}}>
                    <TouchableOpacity onPress={() => {props.navigation.navigate("LikeScreen", {likeList: post.likes})}}>
                        <Text style={{color: 'black', marginHorizontal: 10}}>{post.likes.length}</Text>
                    </TouchableOpacity>
                    <View style={styles.like}>
                        <IconButton
                            icon="heart"
                            animated={true}
                            color={post.likes.find(data1 => data1 === data[0]._id) ? 'red' : 'white'}
                            size={10}
                            style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}
                            onPress={() => {
                                post.likes.find(data1 => data1 === data[0]._id)
                                    ?
                                    unlikePost(post._id)
                                    :
                                    likePost(post._id);
                                setIsLoading(true);
                            }}
                        />
                    </View>
                    <TouchableOpacity onPress={() => {}}>
                        <Text style={{color: 'black', marginLeft: 25, marginRight: 10}}>{post.shares.length}</Text>
                    </TouchableOpacity>
                    <View style={styles.like}>
                        <IconButton
                            icon="share"
                            animated={true}
                            color={post.shares.find(data1 => data1 === data[0]._id) ? 'red' : 'white'}
                            size={10}
                            style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}
                            onPress={() => {
                                post.likes.find(data1 => data1 === data[0]._id)
                                    ?
                                    unlikePost(post._id)
                                    :
                                    likePost(post._id);
                                setIsLoading(true);
                            }}
                        />
                    </View>
                    <TouchableOpacity onPress={() => {}}>
                        <Text style={{color: 'black', marginLeft: 25, marginRight: 10}}>{post.nComments}</Text>
                    </TouchableOpacity>
                    <View style={styles.like}>
                        <IconButton
                            icon="comment"
                            animated={true}
                            color={post.shares.find(data1 => data1 === data[0]._id) ? 'red' : 'white'}
                            size={10}
                            style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}
                            onPress={() => {
                                post.likes.find(data1 => data1 === data[0]._id)
                                    ?
                                    unlikePost(post._id)
                                    :
                                    likePost(post._id);
                                setIsLoading(true);
                            }}
                        />
                    </View>
                </View>
            </View>
        </View>
    );

    const renderItem = (post) => {
        return (
            <Item post={post.item} />
        );
    }

    const renderSectionOne = () => {
        {if(data[0].numberOfPosts === 0 ){
            return(
                <View
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopColor: '#c2c2c2',
                        borderTopWidth: 1
                }}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 25, color: 'black'}} >No Posts</Text>
                </View>
            )
        } else {
            return(
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopColor: '#c2c2c2',
                        borderTopWidth: 1,
                        marginBottom: 160,
                }} >
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        style={styles.list}
                        data={postData}
                        keyExtractor={(post) => post.pid }
                        ItemSeparatorComponent={() => {
                            return (
                                <View style={styles.separator} />
                            )
                        }}
                        renderItem={renderItem}
                    />
                </View>
            )
        }
        }

    }

    const renderSection = () => {
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {renderSectionOne()}
            </View>
        )
    }

    if(isLoading) {
        return (
                <Text>Loading...</Text>
            );

    } else {
        return(
            <View style={styles.container}>
                <View style={{ paddingTop: 20 }}>
                    {/** User Photo Stats**/}
                    <View style={{ flexDirection: 'row' }}>
                        {/**User photo takes 1/3rd of view horizontally **/}
                        <View
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Image
                                source={{ uri: data[0].profilePic }}
                                style={{ width: 75, height: 75, borderRadius: 37.5, backgroundColor: "#c2c2c2" }}
                            />
                        </View>
                        {/**User Stats take 2/3rd of view horizontally **/}
                        <View style={{ flex: 3 }}>
                            {/** Stats **/}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'flex-end'
                                }}
                            >
                                <View style={{ alignItems: 'center', marginHorizontal: 40 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                        <Text style={{ fontSize: 18, color: 'black'}} >{data[0].numberOfPosts}</Text>
                                        <Text style={{ fontSize: 12, color: 'grey' }}>Posts</Text>
                                    </View>
                                </View>

                                <View style={{ alignItems: 'center', marginHorizontal: 40 }}>
                                    <TouchableOpacity
                                        onPress={() =>{props.navigation.navigate('FriendListScreen')}}
                                    >
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                            <Text style={{ fontSize: 18, color: 'black'}} >
                                                {data[0].friendList.length}
                                            </Text>
                                            <Text style={{ fontSize: 12, color: 'grey' }}>Friends</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/**
                             * Edit profile and Settings Buttons **/}
                            <View style={{ alignItems: 'flex-start', paddingTop: 10 }}>
                                <View
                                    style={{ marginLeft: 10, flexDirection: 'row', width: '90%' }}>
                                    <TouchableOpacity
                                        onPress={() => {props.navigation.navigate("EditProfileScreen")}}
                                        bordered
                                        dark
                                        style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            height: 30,
                                            paddingHorizontal: 83,
                                            alignItems: 'center',
                                            backgroundColor: Colors.primary }}
                                    >
                                        <Text style={{color: 'white'}}>Edit Profile</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/**End edit profile**/}
                        </View>
                    </View>
                    <View style={{ paddingBottom: 10, paddingTop: 10 }}>
                        <View style={{ paddingHorizontal: 10 }} >
                            <Text style={{fontSize: 18, color: 'black'}}>
                                {data[0].name}
                            </Text>
                            { (data[0].bio.length > 0) && (
                                <Text style={{color: 'black'}}>{data[0].bio}</Text>
                            ) }
                        </View>
                    </View>
                </View>
                <View>
                    {renderSection()}
                </View>

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

export default ProfileScreen;

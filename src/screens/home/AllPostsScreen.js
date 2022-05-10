import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    RefreshControl,
    Image, TouchableOpacity
} from 'react-native';
import posts from '../../assets/data/postData/posts.json';
import {allPost, likePost, unlikePost, userMe} from "../../apiCalls/apiCalls";
import Video from "react-native-video";
import {IconButton} from "react-native-paper";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const AllPostsScreen = (props) => {

    const [data, setData] = useState([]);
    const [postData, setPostData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadData = async () => {
        try {
            const data1 = await userMe();
            const data2 = await allPost();
            if(data1 && data2){
                setData(data1)
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
        setIsLoading(true);
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
                    source={{uri: post.user.profilePic}}
                    style={{ width: 35, height: 35, borderRadius: 37.5, backgroundColor: "#c2c2c2" }}
                />
                <View style={{flexDirection: 'column', marginHorizontal: 10}}>
                    <Text style={{color: 'black'}}>{post.user.name}</Text>
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
                    <TouchableOpacity onPress={() => {}}>
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
            <Item post = {post.item} />
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
})

export default AllPostsScreen;

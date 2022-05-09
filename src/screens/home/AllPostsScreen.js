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
                    <Text style={{color: '#7c7878'}}>DateAdded</Text>
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
                        <Text style={{color: 'black', marginHorizontal: 25}}>{post.likes.length}</Text>
                    </TouchableOpacity>
                    <View style={styles.like}>
                        <IconButton
                            icon="heart"
                            animated={true}
                            color={post.likes.find(data1 => data1 === data[0]._id) ? 'red' : 'white'}
                            size={20}
                            onPress={() => {
                                post.likes.find(data1 => data1 === data[0]._id)
                                    ?
                                    unlikePost(post._id)
                                    :
                                    likePost(post._id);
                                setPostData([]);

                            }}
                        />
                    </View>
                    <TouchableOpacity onPress={() => {}}>
                        <Text style={{color: 'black', marginHorizontal: 25}}>{post.likes.length} Shares</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>
                        <Text style={{color: 'black', marginHorizontal: 25}}>{post.nComments} Comments</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const renderItem = (post) => {
        return (
            <Item post = {post.item} />
        );
    }

    if(posts.posts.length === 0){
        return(
            <View style={styles.centered} >
                <Text style={{color: 'black'}}>No posts found. Maybe start adding some!</Text>
            </View>
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
        position: 'absolute',
        margin: 10,
        right: 0,
        bottom: 0,
        marginRight: 20,
        borderRadius: 20,
        backgroundColor: '#2ff7dc',
        border: 5,
    },
})

export default AllPostsScreen;

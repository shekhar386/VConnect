import React from 'react';
import {View, Text, StyleSheet, FlatList, ImageBackground, Pressable, SafeAreaView} from 'react-native';
import posts from '../../assets/data/postData/posts.json';
import useIsReady from "../../services/timeout";

const AllPostsScreen = (props) => {


    const isReady = useIsReady();

    const Item = ({body, pid, uid}) => (
        <View
            style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                flex: 1,
                padding: 10,
            }}>
            <Text>{body}</Text>
        </View>
    );

    const renderItem = (post) => {
        return (
            <Item body={post.item.body} pid={post.item.pid} uid={post.item.uid} />
        );
    }


    if(posts.posts.length === 0){
        return(
            <View style={styles.centered} >
                <Text style={{color: 'black'}}>No posts found. Maybe start adding some!</Text>
            </View>
        );
    }

    if(isReady) {
        return (
            <SafeAreaView style={{padding: 10}}>
                <View style={styles.screen} >
                    <FlatList
                        style={styles.list}
                        data={posts.posts}
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
    } else {
        return (
            <SafeAreaView style={{padding: 10}}>
                <View style={styles.screen} >
                    <Text> Loading...</Text>
                </View>
            </SafeAreaView>

        );
    }


};



/*export const screenOptions = (navData) => {
    return{
        headerTitle: 'SocialApp',
        headerRight: () => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-chatboxes' : 'ios-chatboxes'}
                size = {24}
                color={Platform.OS === 'android' ? '#fff' : Colors.brightBlue}
                style={{  padding: 15, marginRight: 5 }}
                onPress={() => navData.navigation.navigate('ChatList')}
            />
        )
    };
}*/


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
        height: 400,
    },
    separator: {
        marginTop: 10,
    },

})

export default AllPostsScreen;

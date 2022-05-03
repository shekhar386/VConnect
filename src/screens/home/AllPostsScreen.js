import React, {useState, useCallback, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button, Platform, AsyncStorage } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import posts from '../../assets/data/postData/posts.json';

const AllPostsScreen = (props) => {

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();


    if(posts.posts.length === 0){
        return(
            <View style={styles.centered} >
                <Text style={{color: 'black'}}>No posts found. Maybe start adding some!</Text>
            </View>
        );
    }

    return (
        <View style={styles.screen} >
            {/*<FlatList
                ref={refPosts}
                style={styles.list}
                refreshing={isRefreshing}
                data={posts}
                keyExtractor={(item) => item._id }
                ItemSeparatorComponent={() => {
                    return (
                        <View style={styles.separator} />
                    )
                }}
                renderItem={(post) => {
                    console.log("posts - ",post.index);
                    return (
                        <Card post={post.item} userId={loggedUser._id} toggleLikeHandler={toggleLikeHandler} />
                    )
                }}
            />*/}

        </View>
    );
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
        flex: 1,
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
    },
    separator: {
        marginTop: 10,
    },

})

export default AllPostsScreen;

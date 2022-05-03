import React, {useCallback} from "@types/react";
import * as usersActions from "../../store/actions/users";
import * as postsActions from "../../store/actions/posts";
import {showMessage} from "react-native-flash-message";
import {ActivityIndicator, Image, Platform, Text, TouchableNativeFeedback, TouchableOpacity, View} from "react-native";
import Colors from "../../constants/Colors";

const loadUsers = useCallback(async () => {
    setIsRefreshing(true);
    try {
        await dispatch(usersActions.fetchUsers());
        await dispatch(postsActions.fetchPosts());
    } catch (err) {
        console.log(err);
    }
    setIsRefreshing(false);
}, [dispatch, setIsLoading]);

const onImageErrorHandler = () => {
    setImageUri(ENV.defaultImageUri)
}


const checkFollow = (userId) => {
    const isFollowed = loggedInUser.following.filter(f => f._id === userId).length !== 0;
    return isFollowed;
}

const followUserHandler = async () => {
    let user = {...currUser};
    delete user.created;
    delete user.followers;
    delete user.following;
    // setIsFollowLoading(true);

    if(checkFollow(user._id)){
        showMessage({
            message: `Your have unfollowed ${user.name}.`,
            type: "warning",
            duration: 3000,
            icon: { icon: "warning", position: 'left' }
        });
        await dispatch(usersActions.unfollowUser(user))
    } else {
        showMessage({
            message: `Your are now following ${user.name}.`,
            type: "success",
            duration: 3000,
            icon: { icon: "success", position: 'left' }
        });
        await dispatch(usersActions.followUser(user))
    }
    // setIsFollowLoading(false);
}







const renderSectionOne = () => {
    if(currUserPosts.length === 0 ){
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderTopColor: '#c2c2c2', borderTopWidth: 1 }} >
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 25 }} >No Posts</Text>
                { currUser._id === loggedInUserId && (
                    <Button
                        style={{ backgroundColor: Colors.brightBlue, padding: 10, borderRadius: 25, marginTop: 15 }}
                        onPress={() => props.navigation.navigate('AddPost')}
                    >
                        <Text style={{ color: '#fff' }} >Create Post</Text>
                    </Button>
                ) }

            </View>
        )
    }
    return currUserPosts.map((post, index) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => props.navigation.navigate('UserPosts', { userId: userId, postIndex: index, fromUserProfile: true })}
            >
                <View  style={[{ width: (width) / 3 }, { height: (width) / 3 }, { marginBottom: 2 }, index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }]}>
                    <Image
                        style={{
                            flex: 1,
                            alignSelf: 'stretch',
                            width: undefined,
                            height: undefined,
                            backgroundColor: '#c2c2c2'
                        }}
                        source={
                            post.updated ? (
                                { uri: `${ENV.apiUrl}/post/photo/${post._id}?${new Date(post.updated)}` }
                            ) : (
                                { uri: `${ENV.apiUrl}/post/photo/${post._id}` }
                            )
                        }
                    />
                </View>
            </TouchableOpacity>
        )
    })
}

const renderSection = () => {
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {renderSectionOne()}
        </View>
    )
}


if(isLoading){
    return (
        <View style={styles.centered} >
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    );
}


let TouchableComp = TouchableOpacity;
if(Platform.OS === 'android' && Platform.Version >= 21){
    TouchableComp = TouchableNativeFeedback;
}

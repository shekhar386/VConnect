import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView, Image
} from 'react-native';
import Colors from '../constants/Colors';
import {postShare, singlePost} from "../apiCalls/apiCalls";
import CheckBox from "@react-native-community/checkbox";
import Video from "react-native-video";

const ShareCreateScreen = (props) => {

    const [body, setBody] = useState('');
    const [postData, setPostData] = useState('')
    const [togglePublic, setTogglePublic] = useState(false);
    const [postBoldStyle, setPostBoldStyle] = useState('normal');
    const [postItalicsStyle, setPostItalicsStyle] = useState('normal');
    const [isLoading, setIsLoading] = useState(true);

    const loadData = async () => {
        try {
            const data1 = await singlePost(props.route.params.postId);
            if(data1){
                setPostData(data1[0]);
                console.log(data1);
                setIsLoading(false);
            }
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        loadData();
    }, [postData.length===0, isLoading])

    const clearForm = () => {
        setBody('');
    }

    const createPost = async () => {
        try {
            await postShare({
                body: body,
                picture: 'NA',
                mediaType: 'NA',
                sharedPost: props.route.params.postId,
                public: togglePublic,
                weight: postBoldStyle,
                style: postItalicsStyle,
            });
            clearForm();
            props.navigation.pop();
        } catch (error) {
            console.log("ERROR ",error.message);
        }
    }

    const Item = ({post}) => (
        <View
            style={{
                backgroundColor: 'white',
                borderColor: "#ccc",
                elevation: 2,
                flex: 1,
                padding: 10,
            }}>
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('OtherProfileScreen', {
                        userId: post.uid,
                    })
                }}
                style={{flexDirection: 'row'}}>
                <Image
                    source={{uri: post.user.profilePic}}
                    style={{ width: 35, height: 35, borderRadius: 37.5, backgroundColor: "#c2c2c2" }}
                />
                <View style={{flexDirection: 'column', marginHorizontal: 10}}>
                    <Text style={{color: 'black'}}>{post.user.name}</Text>
                    <Text style={{color: '#7c7878'}}>{post.dateAdded}</Text>
                </View>
            </TouchableOpacity>
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

            </View>
        </View>
    );

    return(
        <ScrollView  >
            <KeyboardAvoidingView style={styles.screen} behavior="padding" >
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                            <TouchableOpacity onPress={() => {
                                (postBoldStyle === 'normal') ? setPostBoldStyle('bold') : setPostBoldStyle('normal')}}>
                                <Image style={
                                    {
                                        height: 15,
                                        width: 10,
                                        backgroundColor: (postBoldStyle === 'bold') ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0)'
                                    }
                                }
                                       source={require('../assets/bold-icon.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{marginLeft: 10}}
                                onPress={() => {
                                    (postItalicsStyle === 'normal') ? setPostItalicsStyle('italic') : setPostItalicsStyle('normal')}}>
                                <Image style={
                                    {
                                        height: 15,
                                        width: 10,
                                        backgroundColor: (postItalicsStyle === 'italic') ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0)'
                                    }
                                }
                                       source={require('../assets/italic-icon.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 4, alignSelf: 'flex-start', justifyContent: 'flex-start'}}>
                            <TextInput placeholder="Write something..."
                                       placeholderTextColor={'#ccc'}
                                       underlineColorAndroid='transparent'
                                       value={body}
                                       style={[styles.inputs, {fontWeight: postBoldStyle, fontStyle: postItalicsStyle, color: 'black',}]}
                                       multiline={true}
                                       maxLength={200}
                                       onChangeText={(text) => setBody(text) }
                            />
                        </View>
                        <Text style={[styles.inputs, {alignSelf: 'flex-end', color: '#ccc'}]}>{body.length}/200</Text>
                    </View>
                    {(!isLoading) && (
                        <View style={{flex: 5, justifyContent: 'flex-end', alignItems: 'center'}}>
                            <Item post={postData}/>
                        </View>
                    )}
                    <View style={{flexDirection: 'row', marginBottom: 10, alignSelf: 'flex-start'}}>
                        <CheckBox
                            value={togglePublic}
                            style={{alignSelf: 'center'}}
                            tintColors={{true: 'black', false: 'black'}}
                            onValueChange={newValue => {
                                setTogglePublic(newValue);
                            }}
                        />
                        <Text style={{alignSelf: 'center', color: 'black'}}>Public share?</Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={createPost}
                    >
                        <Text style={styles.loginText}>
                            Share
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={() => {props.navigation.pop()}}
                    >
                        <Text style={styles.loginText}>
                            Go Back
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};


export const screenOptions = {
    headerTitle: 'Create Post'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputProfilePic: {
        width: 120,
        height: 120,
        borderColor: Colors.accent,
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: 'center',
        marginBottom: 40,
    },
    errorMsgContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#D8000C',
        backgroundColor: "#FFBABA" ,
        color: "#D8000C",
        borderRadius: 25,
    },
    msgText: {
        fontSize: 15,
    },
    msgIcon: {
        width: 30,
        height: 30,
        // marginLeft: 15,
        justifyContent: 'center'
    },
    labelContainer: {
        alignSelf: 'flex-start',
        marginLeft: 16
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 5,
        color: Colors.accent
    },
    inputContainer: {
        // borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        // borderBottomWidth: 1,
        width: 300,
        height: 150,
        marginBottom: 20,
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputs: {
        marginLeft: 16,
        color: 'black',
        //flex: 1,
        paddingRight: 15,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 300,
        borderRadius: 30,
        backgroundColor: 'transparent'
    },
    loginButton: {
        backgroundColor: Colors.brightBlue,
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 10,
    },
    loginText: {
        color: 'white',
    },
})

export default ShareCreateScreen;

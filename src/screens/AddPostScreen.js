import React, { useEffect,useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    ScrollView, Image
} from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import ImagePicker from "react-native-image-crop-picker";
import Video from "react-native-video";
import CheckBox from "@react-native-community/checkbox";
import {postCreate} from "../apiCalls/apiCalls";

const AddPostScreen = (props) => {

    const [body, setBody] = useState('');
    const [imageData, setImageData] = useState('NA');
    const [mediaType, setMediaType] = useState('');
    const [togglePublic, setTogglePublic] = useState(false);
    const [postBoldStyle, setPostBoldStyle] = useState('normal');
    const [postItalicsStyle, setPostItalicsStyle] = useState('normal');

    const clearForm = () => {
        setBody('');
        setImageData('');
    }

    {/*useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', clearForm);

        return () => {
            unsubscribe();
        };
    }, [clearForm])*/}
    const createPost = async () => {
        try {
            await postCreate({
                body: body,
                picture: imageData,
                public: togglePublic,
                weight: postBoldStyle,
                style: postItalicsStyle,
                mediaType: mediaType[0],
            });
            clearForm();
            props.navigation.pop();
        } catch (error) {
            console.log("ERROR ",error.message);
        }
    }

    const imageInput = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            mediaType: 'any'
        }).then(image => {
            setImageData(image.path);
            setMediaType(image.mime);
        });
    }

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
                                       style={[styles.inputs, {fontWeight: postBoldStyle, fontStyle: postItalicsStyle, color: 'black'}]}
                                       multiline={true}
                                       maxLength={200}
                                       onChangeText={(text) => setBody(text) }
                            />
                        </View>
                        <Text style={[styles.inputs, {alignSelf: 'flex-end', color: '#ccc'}]}>{body.length}/200</Text>
                        {(imageData !== "NA") && (
                            <View style={{flex: 5, justifyContent: 'flex-end', alignItems: 'center'}}>
                                {(mediaType[0] === 'i') ?
                                    <Image source={{uri: imageData}} style={{height: 200, width: 270}} />
                                    :
                                    <Video source={{uri: imageData}} style={{height: 200, width: 270}} />
                                }
                            </View>
                        )}
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, alignSelf: 'flex-start'}}>
                        <CheckBox
                            value={togglePublic}
                            style={{alignSelf: 'center'}}
                            tintColors={{true: 'black', false: 'black'}}
                            onValueChange={newValue => {
                                setTogglePublic(newValue);
                            }}
                        />
                        <Text style={{alignSelf: 'center', color: 'black'}}>Public post?</Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={() => {(imageData !== "NA") ? setImageData('NA') : imageInput()}}
                    >
                        <Text style={styles.loginText}>
                            {(imageData !== "NA") ? "Remove Image/Video" : "Add Image/Video" }
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={createPost}
                    >
                        <Text style={styles.loginText}>
                            Post
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
        height: 425,
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

export default AddPostScreen;

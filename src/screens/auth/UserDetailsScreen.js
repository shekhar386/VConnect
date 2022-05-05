import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image, ImageBackground,
} from 'react-native';
import Colors from '../../constants/Colors';
import * as ImagePicker from "react-native-image-crop-picker";
import users from '../../assets/data/userData/users.json'
import {useDispatch} from "react-redux";
import {login} from "../../store/reducers/userReducer";
import {userDetails} from "../../apiCalls/apiCalls";



const UserDetailsScreen = (props) => {

    const [imageData, setImageData] = useState('https://www.iconsdb.com/icons/preview/violet/add-user-2-xxl.png');
    const [imageSelected, setImageSelected] = useState(false);
    const [bio, setBio] = useState('');
    const dispatch = useDispatch();

    const imageInput = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setImageData(image.path);
            setImageSelected(true);
        });
    }

    return (
        <View style={styles.container}>
            <Image style={styles.bgImage} source={require('../../assets/bg-auth.png')} />
            <View style={styles.titleContainer} >
                <Text style={styles.title}>VConnect</Text>
            </View>
            <Text style={[styles.title, {fontSize: 20, marginBottom: 10}]}>Add a profile picture</Text>
            <TouchableOpacity
                onPress={() => {imageInput()}}
            >
                {console.log(imageData)}
                <View style={styles.inputProfilePic}>
                    <Image source={{uri: imageData}}
                           style={[styles.inputProfilePic, {height: 118, width:118}]}
                    />
                </View>

            </TouchableOpacity>
            <Text style={[styles.title, {fontSize: 20, marginBottom: 10}]}>Add a bio</Text>
            <View style={styles.inputContainer}>
                <TextInput style={{ color: 'black', marginHorizontal: 10, flex: 1 }}
                           placeholder="Write something about yourself..."
                           placeholderTextColor={'grey'}
                           underlineColorAndroid='transparent'
                           multiline={true}
                           onChangeText={text => {setBio(text)}}
                />
            </View>
            <TouchableOpacity
                style={[styles.buttonContainer, styles.registerButton, {backgroundColor: (imageSelected || (bio.length>0)) ? Colors.accent : Colors.primary}]}
                onPress={() => {
                    userDetails(bio, imageData);
                    dispatch(login());
                }}
            >
                <Text style={styles.btnText}>{(imageSelected || (bio.length>0)) ? 'Continue' : 'Skip'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.buttonContainer, styles.registerButton]}
                onPress={() => {
                    props.navigation.pop();
                }}
            >
                <Text style={styles.btnText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#c85ee5',
    },
    titleContainer: {
        marginTop: 40,
        marginBottom: 40,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 42,
        color: '#fff',
        fontWeight: 'bold',
        textShadowOffset: {width: 0,height: 1},
        textShadowRadius: 1,
        textShadowColor: 'black',
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        width: 300,
        height: 145,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginRight: 15,
        justifyContent: 'center'
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
    inputProfilePic: {
        width: 120,
        height: 120,
        borderColor: Colors.accent,
        borderRadius: 100,
        borderWidth: 1,
        alignSelf: 'center',
        marginBottom: 40,
    },
    registerButton: {
        backgroundColor: Colors.lightPrimary,
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
    },
    loginText: {
        color: 'white',
    },
    bgImage: {
        flex: 1,
        position: 'absolute',
        height: '100%',
        justifyContent: 'center',
    },
    btnText: {
        color: "white",
        fontWeight: 'bold'
    }
});






export default UserDetailsScreen;

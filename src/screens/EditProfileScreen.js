import React, { useState, useEffect } from 'react';
import DatePicker from 'react-native-date-picker';
import CountryPicker from 'react-native-country-picker-modal';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import Colors from '../constants/Colors';
import {edit, userMe} from "../apiCalls/apiCalls";
import ImagePicker from "react-native-image-crop-picker";



const EditProfileScreen = (props) => {

    const [dob, setDob] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [dateDone, setDateDone] = useState(false);
    const [country, setCountry] = useState('');
    const [countryOpen, setCountryOpen] = useState(false);
    const [countryDone, setCountryDone] = useState(false);
    const [name, setName] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [bio, setBio] = useState(undefined);
    const [profilePic, setProfilePic] = useState('https://www.iconsdb.com/icons/preview/violet/add-user-2-xxl.png');

    const loadData = async () => {
        try {
            const data1 = await userMe();
            if(data1){
                setData(data1);
                setName(data1[0].name);
                setEmail(data1[0].email);
                setDob(new Date(data1[0].dob.split(' ')[0]));
                setCountry(data1[0].country);
                setBio(data1[0].bio);
                setProfilePic(data1[0].profilePic)
                setIsLoading(false)
            }
        } catch(e) {
            console.log(e);
        }
    }
    useEffect(() => {
        loadData();
    }, [data.length === 0, isLoading])

    const imageInput = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setProfilePic(image.path);
        });
    }

    const inputChangeHandler = (text, inputField) => {
        if (inputField === 1) {
            setName(text);
        } else if (inputField === 2) {
            setDob(text);
        } else if (inputField === 3) {
            setCountry(text);
        } else if (inputField === 4) {
            setEmail(text);
        }
    }

    if(!isLoading) {
        return (
            //Entire screen container
            <View style={styles.container}>
                <View style={styles.titleContainer} >
                    <Text style={styles.title}>Edit Profile</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {imageInput()}}
                >
                    <View style={styles.inputProfilePic}>
                        <Image source={{uri: profilePic}}
                               style={[styles.inputProfilePic, {height: 100, width:100, marginBottom: 10}]}
                        />
                    </View>
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                    <TextInput style={{ color: 'black', marginHorizontal: 10, flex: 1 }}
                               underlineColorAndroid='transparent'
                               value={name}
                               defaultValue={data[0].name}
                               onChangeText={(text) => inputChangeHandler(text, 1)}
                    />
                    <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/nolan/40/000000/name.png' }} />
                </View>
                <TouchableOpacity
                    onPress={() => setOpen(true)}
                >
                    <View style={styles.inputContainer}>
                        <Text style={{ color: 'black', marginHorizontal: 10, flex: 1 }}
                        >{dateDone === false ? data[0].dob.split(' ')[0] : `${dob.getFullYear()}-${dob.getMonth()}-${dob.getDate()}`}</Text>
                        <Image style={styles.inputIconDOB} source={{ uri: 'https://img.icons8.com/ios/50/000000/birth-date.png' }} />
                    </View>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={open}
                    mode={'date'}
                    date={dob}
                    onConfirm={(date) => {
                        setOpen(false);
                        setDateDone(true);
                        setDob(date);
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                />
                <TouchableOpacity
                    onPress={() => setCountryOpen(true)}
                >
                    <View style={styles.inputContainer}>
                        <Text style={{
                            color: 'black', marginHorizontal: 10, flex: 1 }}
                        >{countryDone === false ? data[0].country : `${country}`}</Text>
                        <CountryPicker
                            visible={countryOpen}
                            placeholder={''} withFilter={true}
                            onClose={() => setCountryOpen(false)}
                            onSelect={(country) => {
                                inputChangeHandler(country.name, 3);
                                setCountryDone(true);
                            }}
                        />
                        <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/ios/50/000000/worldwide-location.png' }} />
                    </View>
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                    <TextInput style={{ color: 'black', marginHorizontal: 10, flex: 1 }}
                               keyboardType="email-address"
                               underlineColorAndroid='transparent'
                               value={email}
                               defaultValue={data[0].email}
                               onChangeText={(text) => inputChangeHandler(text, 4)}
                    />
                    <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/nolan/40/000000/email.png' }} />
                </View>
                <View style={styles.inputContainerBio}>
                    <TextInput style={{ color: 'black', marginHorizontal: 10, flex: 1 }}
                               defaultValue={data[0].bio}
                               underlineColorAndroid='transparent'
                               multiline={true}
                               onChangeText={text => {setBio(text)}}
                    />
                </View>
                <TouchableOpacity
                    style={[styles.buttonContainer, styles.loginButton]}
                    onPress={() => {
                        const userEditData ={
                            name,
                            dob,
                            country,
                            email,
                            profilePic,
                            bio,
                        }
                        edit(userEditData);
                    }}
                >
                    <Text style={styles.loginText}>
                        Confirm Edit
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
    else {
        return (
            //Entire screen container
            <View style={styles.container}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#ccc',
    },
    titleContainer: {
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        color: 'black',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
        textShadowColor: 'black',
    },
    inputContainerBio: {
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
    errorMsgContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#D8000C',
        backgroundColor: "#FFBABA",
        color: "#D8000C",
        borderRadius: 25,
    },
    successMsgContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#4F8A10',
        backgroundColor: "#DFF2BF",
        color: "#4F8A10",
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

    inputContainer: {
        // borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        // borderBottomWidth: 1,
        width: 300,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
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
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        color: 'black'
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginRight: 15,
        justifyContent: 'center'
    },
    inputIconDOB: {
        width: 25,
        height: 25,
        marginRight: 18,
        justifyContent: 'center',
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
    btnForgotPassword: {
        height: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 20,
        width: 300,
    },
    loginButton: {
        backgroundColor: "#00b5ec",

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
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






export default EditProfileScreen;

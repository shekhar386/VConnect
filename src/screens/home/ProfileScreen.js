import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Button,
} from "react-native";
import users from '../../assets/data/userData/users.json'
import Colors from "../../constants/Colors";
import {userMe} from "../../apiCalls/apiCalls";
import {dataValue, userData} from "../../store/reducers/userDataReducer";


const ProfileScreen = (props) => {

    userMe();

    console.log(dataValue());



    const renderSectionOne = () => {
        {if(0 === 0 ){
            return(
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderTopColor: '#c2c2c2', borderTopWidth: 1 }} >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 25 }} >No Posts</Text>
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

    return (
        <View style={styles.container} >
            <View style={{ paddingTop: 20 }}>
                {/** User Photo Stats**/}
                <View style={{ flexDirection: 'row' }}>
                    {/**User photo takes 1/3rd of view horizontally **/}
                    <View
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Image
                            source={{ uri: users.users[0].profilePic }}
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
                                    <Text style={{ fontSize: 18, color: 'black'}} >0</Text>
                                    <Text style={{ fontSize: 12, color: 'grey' }}>Posts</Text>
                                </View>
                            </View>

                            <View style={{ alignItems: 'center', marginHorizontal: 40 }}>
                                <TouchableOpacity
                                    onPress={() =>{}}
                                >
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                        <Text style={{ fontSize: 18, color: 'black'}} >
                                            0
                                        </Text>
                                        <Text style={{ fontSize: 12, color: 'grey' }}>Friends</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/**
                         * Edit profile and Settings Buttons **/}

                        { /*users.users.id === loggedInUserId ? (*/ }
                        <View style={{ alignItems: 'flex-start', paddingTop: 10 }}>
                            <View
                                style={{ marginLeft: 10, flexDirection: 'row', width: '90%' }}>
                                <TouchableOpacity
                                    onPress={() => {console.log(data.friendList.length);}}
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
                        { /* ) : (
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 10 }}>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row' }}>
                                    <Button
                                        onPress={followUserHandler}
                                        bordered
                                        dark
                                        style={{ flex: 2, marginLeft: 10, marginRight: 10, justifyContent: 'center', height: 30 }}
                                    >
                                        { checkFollow(currUser._id) ? (
                                            <>
                                                { isFollowLoading ? (
                                                    <ActivityIndicator size="small" color="#fff" />
                                                ) : (
                                                    <Text style={{ color: 'black' }} >Unfollow</Text>
                                                ) }
                                            </>
                                       ) : (
                                            <>
                                                { isFollowLoading ? (
                                                    <ActivityIndicator size="small" color="#fff" />
                                                ) : (
                                                    <Text style={{ color: 'black' }} >Follow</Text>
                                                ) }
                                            </>
                                        ) }
                                    </Button>
                                </TouchableOpacity>
                            </View>
                        ) }*/}
                        {/**End edit profile**/}
                    </View>
                </View>

                <View style={{ paddingBottom: 10, paddingTop: 10 }}>
                    <View style={{ paddingHorizontal: 10 }} >
                        <Text style={{fontSize: 18, color: 'black'}}>
                            0
                        </Text>
                        { (1 > 0) && (
                            <Text style={{color: 'black'}}>0</Text>
                        ) }
                    </View>
                </View>
            </View>
            <View>
                {renderSection()}
            </View>

        </View>
    );
}

{/*export const screenOptions = (navData) => {
    const routeParams = navData.route.params ? navData.route.params : {};
    if(!routeParams.name){
        return{
            headerTitle: routeParams.name ? routeParams.name : "Profile",
            headerRight: () => (
                <MenuItem />
            )
        }
    } else {
        return{
            headerTitle: routeParams.name ? routeParams.name : "Profile",
        }
    }
}*/}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

export default ProfileScreen;

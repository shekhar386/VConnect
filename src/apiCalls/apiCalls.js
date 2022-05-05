import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {storeUser} from "../store/reducers/userDataReducer";

const baseUrl = 'http://192.168.1.7:11911';

export const signupCall = async (user) => {

    const user1 = {
        name: user.name,
        email: user.email,
        password: user.password,
        dob: user.date,
        country: user.country,
    };
    console.log(user1);
    await axios.post(`${baseUrl}/user/create`, user1).then((response) => {
        console.log(response.data);
    }).catch((e) => {
        console.log(e.response.data);
    });
}

export const userMe = async () => {
    const dispatch = useDispatch();

    const promise = await axios.get(`${baseUrl}/user/me`).then(response => {
        return response.data
    }).catch((e) => {
        console.log(e.response.data);
    });
    dispatch(storeUser(promise));
}

export const userAuth = async (email, password) => {
    const user = {
        email: email,
        password: password,
    }
    await axios.post(`${baseUrl}/user/auth`, user).then((response) => {
        console.log(response.data);
    }).catch((e) => {
        console.log(e.response.data);
    });
}

export const userDetails = async (bio, profilePic) => {
    const userData = {
        bio: bio,
        profilePic: profilePic,
    }
    await axios.put(`${baseUrl}/user/userDetails`, userData).then((response) => {
        console.log(response.data);
    }).catch((e) => {
        console.log(e.response.data);
    });
}

import axios from "axios";
import instance from "./axiosConfig";

export const signupCall = async (user) => {
    const user1 = {
        name: user.name,
        email: user.email,
        password: user.password,
        dob: user.date,
        country: user.country,
    };
    console.log(user1);
    await instance.post(`user/create`, user1).then((response) => {
        console.log(response.data);
    }).catch((e) => {
        alert(JSON.stringify(e.response.data.message));
        throw new Error(JSON.stringify(e.response.data.message));
    });
}

export const userMe = async () => {
    return await instance.get(`user/me`).then(response => {
        return response.data;
    }).catch((e) => {
        alert(JSON.stringify(e.response.data.message));
        throw new Error(JSON.stringify(e.response.data.message));
    });
}

export const userAuth = async (email, password) => {
    const user = {
        email: email,
        password: password,
    }
    await instance.post(`user/auth`, user).then((response) => {
        console.log(response.data);
    }).catch((e) => {
        alert(JSON.stringify(e.response.data.message));
        throw new Error(JSON.stringify(e.response.data.message));
    });
}

export const userDetails = async (bio, profilePic) => {
    const userData = {
        bio: bio,
        profilePic: profilePic,
    }
    await instance.put(`user/userDetails`, userData).then((response) => {
        console.log(response.data);
    }).catch((e) => {
        alert(JSON.stringify(e.response.data.message));
        throw new Error(JSON.stringify(e.response.data.message));
    });
}

export const postCreate = async (postDetails) => {
    await instance.post(`post/create`, postDetails).then((response) => {
        console.log(response.data);
    }).catch((e) => {
        alert(JSON.stringify(e.response.data.message));
        throw new Error(JSON.stringify(e.response.data.message));
    });
}

export const allPost = async () => {
    return await instance.get(`post/all`).then(response => {
        return response.data;
    }).catch((e) => {
        alert(JSON.stringify(e.response.data.message));
        throw new Error(JSON.stringify(e.response.data.message));
    });
}

export const userPost = async () => {
    return await instance.get(`post/user`).then(response => {
        return response.data;
    }).catch((e) => {
        alert(JSON.stringify(e.response.data.message));
        throw new Error(JSON.stringify(e.response.data.message));
    });
}

export const likePost = async (postId) => {
    return await instance.put(`post/like`, {postId}).then(response => {
        return response.data;
    }).catch((e) => {
        alert(JSON.stringify(e.response.data.message));
        throw new Error(JSON.stringify(e.response.data.message));
    });
}

export const unlikePost = async (postId) => {
    return await instance.put(`post/unlike`, {postId}).then(response => {
        return response.data;
    }).catch((e) => {
        alert(JSON.stringify(e.response.data.message));
        throw new Error(JSON.stringify(e.response.data.message));
    });
}

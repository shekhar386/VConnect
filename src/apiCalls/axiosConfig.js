const axios = require('axios');
const instance = axios.create({
    baseURL: "http://192.168.43.22:11911/",
    timeout: 15000, // in milliseconds
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

export default instance;

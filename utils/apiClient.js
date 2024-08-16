const axios = require('axios');

const apiClient = axios.create({
    baseURL: 'https://api.postman.com/collections/', 
    timeout: 1000,
    headers: {
        'Authorization': `Bearer ${process.env.POSTMAN_API_KEY}` 
    }
});

module.exports = apiClient;

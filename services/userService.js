const userModel = require('../models/userModel');

exports.registerUser = async (userData) => {
    return await userModel.registerUser(userData);
};

exports.loginUser = async (credentials) => {
    return await userModel.loginUser(credentials);
};

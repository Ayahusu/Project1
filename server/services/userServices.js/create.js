const userModel = require("../../model/userModel");

module.exports.createUser = async ({ username, email, password }) => {

    try {
        const user = await userModel.create({ username, email, password });
        return user;
    } catch (error) {
        throw new Error("Error creating user: " + error.message);
    }

}
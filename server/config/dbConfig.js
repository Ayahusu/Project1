const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_URI);
        console.log("Database connected....... ");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB; 
const mongoose = require("mongoose");

const dbConnect = () => {
    mongoose.connect(process.env.MONGO)
        .then(() => {
            console.log("Database connected successfully");
        })
        .catch((error) => {
            console.error("Database connection failed:", error);
        });
};

module.exports = dbConnect;

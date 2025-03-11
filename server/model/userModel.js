const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
}, {
    timestamps: true
})

userSchema.method.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, { expiresIn: "24h" });
    return token
}

userSchema.method.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next(); // Skip if password is not modified

    try {
        const salt = bcrypt.genSalt(10); // Generate salt
        this.password = await bcrypt.hash(this.password, salt); // Hash password
        next();
    } catch (error) {
        next(error);
    }
})

module.exports = mongoose.model("User", userSchema);

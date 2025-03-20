const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        minlength: [3, 'Username must be at least 3 characters long']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },
    post: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Post',
        default: []
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    isActive: {
        type: Boolean,
        default: true
    },
    profileImg: {
        type: String,
        default: ""
    },
}, { timestamps: true })

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.genAuthToken = async function () {
    return await jwt.sign({ _id: this._id }, process.env.SECRET_KEY, { expiresIn: "7d" })
}

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error)
    }
})

module.exports = mongoose.model("User", userSchema)
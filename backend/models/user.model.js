import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxlength: 32
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 3,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        trim: true,
        unique: true,
        lowercase: true,
        minLength: 5,
        maxLength: 255,
        match: [/.+\@.+\..+/, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 255,
    },
    isFirstLogin: {
        type: Boolean,
        default: true
    },
    lastOpened: {
        type: Date,
        default: Date.now
    },
    collections: {
        type: Array,
        default: []
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
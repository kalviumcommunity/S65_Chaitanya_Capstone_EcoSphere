const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
}, {timestamps: true})

module.exports = mongoose.model("User", userSchema)
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    login: {
        type: String,
        unique: true,
        required: [true, 'Please add a login field']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please add an email field']
    },
    name: {
        type: String,
        required: [true, 'Please add a name field']
    },
    surname: {
        type: String,
        required: [true, 'Please add a surname field']
    },
    password: {
        type: String,
        required: [true, 'Please add a password field']
    }
},
    {
        timestamps: true
    }
)
module.exports = mongoose.model('User', userSchema)
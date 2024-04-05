const mongoose = require('mongoose');

const Avatar = new mongoose.model('avatar', new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    avatar: String,
},
{timestamps: true}
))

module.exports = Avatar
const mongoose = require('../db/conn');
const {Schema} = mongoose

const Avatar = new mongoose.model(
    'avatar', 
    new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    avatar: String,
},
{timestamps: true}
))

module.exports = Avatar
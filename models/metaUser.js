const mongoose = require('../db/conn')
const {Schema} = mongoose

const MetaUser = new mongoose.model(
    'metauser', 
    new Schema({
    valorMeta: Number,
    relUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
},
{timestamps: true})
) 

module.exports = MetaUser;
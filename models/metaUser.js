const mongoose = require('mongoose')

const MetaUser = new mongoose.model('metauser', new mongoose.Schema({
    valorMeta: String,
    relUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
},
{timestamps: true})
) 

module.exports = MetaUser;
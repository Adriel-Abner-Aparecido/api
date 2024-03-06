const mongoose = require('mongoose')

const MetaUser = new mongoose.model('metauser', new mongoose.Schema({
    valorMeta: String,
    relUser: String,
},
{timestamps: true})
) 

module.exports = MetaUser;
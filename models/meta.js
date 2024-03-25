const mongoose = require('mongoose')

const Meta = new mongoose.model('meta', new mongoose.Schema({
    meta: Number,
    diasUteis: Number,
    metaData: String,
},
{timestamps: true})
) 

module.exports = Meta;
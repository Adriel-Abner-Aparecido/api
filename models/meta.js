const mongoose = require('../db/conn')
const {Schema} = mongoose

const Meta = new mongoose.model(
    'meta', 
    new Schema({
    valorMeta: Number,
    diasUteis: Number,
    metaData: String,
},
{timestamps: true})
) 

module.exports = Meta;
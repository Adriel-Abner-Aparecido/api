const mongoose = require('mongoose')

const MetaObra = new mongoose.model('metaobra', new mongoose.Schema({
    valorMeta: String,
    relObra: String,
},
{timestamps: true})
) 

module.exports = MetaObra;
const mongoose = require('mongoose')

const MetaObra = new mongoose.model('metaobra', new mongoose.Schema({
    valorMeta: Number,
    relObra: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'obras'
    },
},
{timestamps: true})
) 

module.exports = MetaObra;
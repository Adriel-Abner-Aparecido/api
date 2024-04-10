const mongoose = require('../db/conn');
const {Schema} = mongoose

const NumerosObra = mongoose.model(
    'numerosobra', 
    new Schema({
    refObra: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'obras'
    },
    numeroBloco: String,
    numeroAndares: Number,
    numeroUnidades: Number,
},
{timestamps:true}),
)

module.exports = NumerosObra
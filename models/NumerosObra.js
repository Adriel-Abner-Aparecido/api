const mongoose = require('mongoose');

const NumerosObra = mongoose.model('numerosobra', new mongoose.Schema({
    refObra: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'obras'
    },
    numeroBloco: String,
    numeroAndares: String,
    numeroUnidades: String,
},
{timestamps:true}),
)

module.exports = NumerosObra
const mongoose = require('mongoose');

const NumerosObra = mongoose.model('numerosobra', new mongoose.Schema({
    refObra: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'obras'
    },
    numeroBloco: Number,
    numeroAndares: Number,
    numeroUnidades: Number,
},
{timestamps:true}),
)

module.exports = NumerosObra
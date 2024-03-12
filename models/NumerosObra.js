const mongoose = require('mongoose');

const NumerosObra = mongoose.model('NumerosObra', new mongoose.Schema({
    refObra: String,
    numeroBloco: String,
    numeroAndares: String,
    numeroUnidades: String,
},
{timestamps:true}),
)

module.exports = NumerosObra
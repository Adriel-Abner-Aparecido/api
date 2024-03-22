const mongoose = require('mongoose')

const ServicosPrestados = new mongoose.model('servicosprestados', new mongoose.Schema({
    refObra: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'obras'
    },
    servicoPrestado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'servicos'
    },
    valoraReceber: Number,
    valoraPagar: Number
},
{timestamps: true})
) 

module.exports = ServicosPrestados;
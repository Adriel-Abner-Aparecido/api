const mongoose = require('../db/conn')
const {Schema} = mongoose

const ServicosPrestados = new mongoose.model(
    'servicosprestados', 
    new Schema({
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
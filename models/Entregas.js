const mongoose = require('mongoose')

const EntregaServico = new mongoose.model('entregaservico', new mongoose.Schema({
    refUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    refObra: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'obras'
    },
    blocoObra: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'numerosobra'
    },
    servicoObra: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'servicos'
    },
    unidadeObra: String,
    etapaEntregue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'servicos'
    },
    statusEntrega: {
        type: String,
        default: 'pendente',
    },
},
{timestamps: true}
))

module.exports = EntregaServico;
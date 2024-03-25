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
    unidadeObra: Number,
    etapaEntregue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'etapas'
    },
    statusEntrega: {
        type: String,
        default: 'pendente',
    },
},
{timestamps: true}
))

module.exports = EntregaServico;
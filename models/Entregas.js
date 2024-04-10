const mongoose = require('../db/conn')
const {Schema} = mongoose

const EntregaServico = new mongoose.model(
    'entregaservico', 
    new Schema({
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
        ref: 'servicosprestados'
    },
    refServico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'servicosprestados'
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
    percentual: Number,
},
{timestamps: true}
))

module.exports = EntregaServico;
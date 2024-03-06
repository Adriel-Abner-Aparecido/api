const mongoose = require('mongoose')

const EntregaServico = new mongoose.model('entregaServico', new mongoose.Schema({
    refUsuario: String,
    refObra: String,
    nomeUsuario: String,
    nomeObra: String,
    etapaEntregue: String,
    statusEntrega: String,
},
{timestamps: true}
))

module.exports = EntregaServico;
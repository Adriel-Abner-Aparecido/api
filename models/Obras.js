const mongoose = require('mongoose');

const Obra = mongoose.model('obras', new mongoose.Schema({
    nomeObra: String,
    enderecoObra: String,
    cidadeObra: String,
    numeroRua: String,
    complementoObra: String,
    tipoObra: String,
    servicoPrestado: String,
    precoServico: String,
    descricaoObra: String,
},
{timestamps:true}),
)

module.exports = Obra
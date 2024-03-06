const mongoose = require('mongoose');

const Obra = mongoose.model('Obra', new mongoose.Schema({
    nomeObra: String,
    enderecoObra: String,
    cidadeObra: String,
    numeroRua: String,
    complementoObra: String,
    tipoObra: String,
    qtdBlocos: String,
    qtdAndares: String,
    qtdApartamentos: String,
    servicoPrestado: String,
    precoServico: String,
    descricaoObra: String,
},
{timestamps:true}),
)

module.exports = Obra
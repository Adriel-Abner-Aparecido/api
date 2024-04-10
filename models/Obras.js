const mongoose = require('../db/conn');
const {Schema} = mongoose

const Obra = mongoose.model(
    'obras', 
    new Schema({
    nomeObra: String,
    enderecoObra: String,
    cidadeObra: String,
    numeroRua: String,
    complementoObra: String,
    tipoObra: String,
    descricaoObra: String,
},
{timestamps:true}),
)

module.exports = Obra
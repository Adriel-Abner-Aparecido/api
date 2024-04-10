const mongoose = require('../db/conn')
const {Schema} = mongoose

const Servicos = new mongoose.model(
    'servicos', 
    new Schema({
    nomeServico: String,
},
{timestamps: true})
) 

module.exports = Servicos;
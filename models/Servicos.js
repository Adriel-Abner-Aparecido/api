const mongoose = require('mongoose')

const Servicos = new mongoose.model('servicos', new mongoose.Schema({
    nomeServico: String,
},
{timestamps: true})
) 

module.exports = Servicos;
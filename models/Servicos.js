const mongoose = require('mongoose')

const Servico = new mongoose.model('servico', new mongoose.Schema({
    nomeServico: String,
},
{timestamps: true})
) 

module.exports = Servico;
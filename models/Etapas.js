const mongoose = require('mongoose')

const Etapas = new mongoose.model('etapas', new mongoose.Schema({
    nomeEtapa: String,
    relEtapa: String,
},
{timestamps: true})
) 

module.exports = Etapas;
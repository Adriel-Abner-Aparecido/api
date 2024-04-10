const mongoose = require('../db/conn');
const {Schema} = mongoose

const Etapas = new mongoose.model(
    'etapas', 
    new Schema({
    nomeEtapa: String,
    refEtapa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'servicos'
    },
    tempoExecucao: Number,
},
{timestamps: true})
) 

module.exports = Etapas;
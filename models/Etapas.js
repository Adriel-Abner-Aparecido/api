const mongoose = require('mongoose');

const Etapas = new mongoose.model('etapas', new mongoose.Schema({
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
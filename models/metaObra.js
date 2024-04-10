const mongoose = require('../db/conn')
const {Schema} = mongoose

const MetaObra = new mongoose.model(
    'metaobra',
    new Schema({
        valorMeta: Number,
        relObra: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'obras'
        },
    },
        { timestamps: true })
)

module.exports = MetaObra;
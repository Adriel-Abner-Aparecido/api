const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Descontos = new mongoose.model(
  "descontos",
  new Schema(
    {
      relUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      descricao: {
        type: String,
      },
      valorDesconto: {
        type: Number,
      },
    },
    { timestamps: true }
  )
);
module.exports = Descontos;

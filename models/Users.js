const mongoose = require('mongoose')

const User = mongoose.model('users', new mongoose.Schema({
  nomeUsuario: String,
  nomeCompleto: String,
  emailUsuario: String,
  nivelUsuario: {
    type: String,
    default: 'user'
  },
  senhaUsuario: String,
  salt: String,
  companyUsuario: {
    type: String,
    default: 'GTEQ Gestão e Construção'
  },
  funcaoUsuario: String,
  status: {
    type: Boolean,
    default: false,
  }
},
  { timestamps: true }),
);

module.exports = User
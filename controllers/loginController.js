const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const getToken = require('../helpers/gettoken')

const User = require('../models/Users');

module.exports = class LoginController {

    static async login(req, res) {
        
        const { nomeUsuario, senhaUsuario } = req.body
        const user = await User.findOne({ nomeUsuario: nomeUsuario });
        const passwordHash = bcrypt.hashSync(senhaUsuario, user.salt);

        if (!nomeUsuario) {
            return res.status(400).json({ message: 'Informe o nome de usuario' });
        }

        if (!senhaUsuario) {
            return res.status(400).json({ message: 'Informe a senha' });
        }

        if (!user) {
            return res.status(404).json({ message: 'Usuario nao encontrado' });
        }

        if (user.senhaUsuario !== passwordHash) {
            return res.status(404).json({ message: 'Senha incorreta!' })
        }

        if (user && bcrypt.compareSync(senhaUsuario, user.senhaUsuario, user.nomeUsuario)) {
            const usuario = {
                userId: user._id,
                nivel: user.nivelUsuario,
                userName: user.nomeUsuario,
                status: user.status
            }
            const token = jwt.sign(usuario, 'secreto', { expiresIn: '24h' });
            res.json({ token, nivelUsuario: usuario.nivel, userId: user._id, userName: user.nomeUsuario, status: user.status });
        }
    }
    
    static async checkUser(req, res){

        let currentUser

        if(req.headers.authorization){

            const token = getToken(req)
            const decoded = jwt.verify(token, 'secreto')

            currentUser = await User.findById(decoded.userId)

            currentUser.senhaUsuario = undefined
        }else{
            currentUser = null
        }
        res.status(200).send(currentUser)
    }
}
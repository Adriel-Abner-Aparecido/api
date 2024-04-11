const bcrypt = require('bcrypt')
const User = require('../models/Users')

module.exports = class UserController {
    //Cadastro de Usuarios
    static async cadastro(req, res) {
        try {

            const { nomeUsuario, nomeCompleto, emailUsuario, senhaUsuario, confirmaSenha, nivelUsuario, funcaoUsuario } = req.body;
            const existingUser = await User.findOne({ emailUsuario });

            if (!nomeUsuario) {
                return res.status(400).json({ message: 'Informe o nome de usuario' });
            }

            if (!nomeCompleto) {
                return res.status(400).json({ message: 'Informe o nome completo' });
            }

            if (!emailUsuario) {
                return res.status(400).json({ message: 'Informe o email' });
            }

            if (!senhaUsuario) {
                return res.status(400).json({ message: 'Informe a senha' });
            }

            if (confirmaSenha !== senhaUsuario) {
                return res.status(400).json({ Message: 'As senhas precisam ser iguais' });
            }

            if (existingUser) {
                return res.status(400).json({ message: 'Este email já está cadastrado.' });
            }

            const salt = bcrypt.genSaltSync(12)
            const passwordHash = bcrypt.hashSync(senhaUsuario, salt)

            // Cria um novo usuário
            const newUser = new User({
                nomeUsuario,
                nomeCompleto,
                emailUsuario,
                nivelUsuario,
                salt,
                senhaUsuario: passwordHash,
                confirmaSenha,
                funcaoUsuario,
            });

            // Salva o novo usuário no banco de dados
            await newUser.save();

            res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }

    //Pega todos os Usuarios
    static async usuarios(req, res) {
        try {
            const users = await User.find().sort({ createdAt: -1 });
            res.json({ users: users });
        } catch {
            res.status(500).json({ message: "Erro" });
        }
    }

    //Pega um Usuario pelo ID
    static async usuario(req, res) {
        try {
            const { id } = req.params;
            const usuario = await User.findById(id).select("-senhaUsuario");
            res.json({ usuario: usuario });
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: "Erro" });
        }
    }

    //Atualiza Usuario
    static async atualizausuario(req, res) {
        try {
            const { id } = req.params;
            const { nomeUsuario, nomeCompleto, emailUsuario, nivelUsuario, funcaoUsuario, status } = req.body;

            const atualizaUsuario = await User.findById(id);
            if (!atualizaUsuario) {
                return res.status(404).json('Usuario não encontrado');
            }

            atualizaUsuario.nomeUsuario = nomeUsuario;
            atualizaUsuario.nomeCompleto = nomeCompleto;
            atualizaUsuario.emailUsuario = emailUsuario;
            atualizaUsuario.nivelUsuario = nivelUsuario;
            atualizaUsuario.funcaoUsuario = funcaoUsuario;
            atualizaUsuario.status = status;
            atualizaUsuario.save();
            res.status(200).json('Atualizado com sucesso')
        } catch {
            res.status(500).json('Erro interno do servidor!')
        }
    }

    //Atualiza Senha
    static async atualizasenha(req, res) {
        try {
            const { id } = req.params;
            const { senhaUsuario, confirmaSenha } = req.body;

            const atualizaUsuario = await User.findById(id);

            if (!atualizaUsuario) {
                return res.status(404).json('Usuario não encontrado');
            }

            if (senhaUsuario !== confirmaSenha) {
                return res.status(400).json('As senhas devem ser iguais!')
            }

            const salt = bcrypt.genSaltSync(12)
            const passwordHash = bcrypt.hashSync(senhaUsuario, salt)

            atualizaUsuario.salt = salt;
            atualizaUsuario.senhaUsuario = passwordHash;
            atualizaUsuario.save();
            res.status(200).json('Atualizado com sucesso')
        } catch {
            res.status(500).json('Erro interno do servidor!')
        }
    }
}
const router = require('express').Router();

const UserController = require('../controllers/UserController');

router.post('/cadastro', UserController.cadastro);
router.get('/usuarios', UserController.usuarios);
router.get('/usuario/:id', UserController.usuario);
router.put('/atualizaUsuario/:id', UserController.atualizausuario);
router.put('/atualizaSenha/:id', UserController.atualizasenha);

module.exports = router;
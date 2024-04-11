const router = require("express").Router();

const UserController = require("../controllers/UserController");

const checkToken = require("../helpers/check-tokken");

router.post("/cadastro", UserController.cadastro);
router.get("/usuarios", checkToken, UserController.usuarios);
router.get("/usuario/:id", checkToken, UserController.usuario);
router.put("/atualizaUsuario/:id", checkToken, UserController.atualizausuario);
router.put("/atualizaSenha/:id", checkToken, UserController.atualizasenha);

module.exports = router;

const router = require("express").Router();

const MetaController = require("../controllers/metaController");
const checkToken = require("../helpers/check-tokken");

router.post("/meta", checkToken, MetaController.cadastrarmeta);
router.post("/metaObra", checkToken, MetaController.cadastrarmetaobra);
router.post("/metaUser", checkToken, MetaController.cadastrarmetausuario);

router.get("/meta", checkToken, MetaController.metas);
router.get("/meta/:id", checkToken, MetaController.meta);
router.get("/metaObra/:relObra", checkToken, MetaController.metaobra);
router.get("/metaUser/:relUser", checkToken, MetaController.metausuario);

module.exports = router;

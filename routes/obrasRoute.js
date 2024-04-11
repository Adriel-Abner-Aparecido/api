const router = require("express").Router();

const ObrasController = require("../controllers/ObrasController");
const checkToken = require("../helpers/check-tokken");

router.post("/castrarObra", checkToken, ObrasController.cadastoobras);
router.get("/verObras", checkToken, ObrasController.verobras);
router.get("/obra/:id", checkToken, ObrasController.verobra);
router.put("/atualizaObra/:id", checkToken, ObrasController.atualizaobra);

module.exports = router;

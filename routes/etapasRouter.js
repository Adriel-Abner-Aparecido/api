const router = require("express").Router();

const EtapasController = require("../controllers/etapasController");
const checkToken = require("../helpers/check-tokken");

router.post("/cadastroEtapa", checkToken, EtapasController.cadastraretapa);
router.get("/etapas", checkToken, EtapasController.etapas);
router.get("/refEtapas/:refEtapa", checkToken, EtapasController.etapasservico);
router.get("/refEtapa/:id", checkToken, EtapasController.etapa);
router.put("/atualizaEtapa/:id", checkToken, EtapasController.atualizaetapa);
router.delete("/deleteEtapa/:id", checkToken, EtapasController.deletaetapa);

module.exports = router;

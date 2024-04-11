const router = require("express").Router();

const EntregasController = require("../controllers/entregasController");
const checkToken = require("../helpers/check-tokken");

router.post("/entregaServico", EntregasController.entregaservico);
router.get("/entregas", EntregasController.entregas);
router.get(
  "/entregaServicoUsuario/:refUsuario",
  checkToken,
  EntregasController.entregasusuario
);
router.get("/entregaServicoObra/:refObra", EntregasController.entregasobra);
router.put("/atualizaStatusEntrega/:id", EntregasController.atualizastatus);

module.exports = router;

const router = require("express").Router();

const ServicosController = require("../controllers/servicosController");
const checkToken = require("../helpers/check-tokken");

router.post(
  "/cadastroServico",
  checkToken,
  ServicosController.cadastrarservico
);
router.get("/servicos", checkToken, ServicosController.verservicos);
router.get("/servico/:id", checkToken, ServicosController.verservico);
router.put(
  "/atualizaServico/:id",
  checkToken,
  ServicosController.atualizaservico
);
router.delete(
  "/deleteServico/:id",
  checkToken,
  ServicosController.deletarservico
);

module.exports = router;

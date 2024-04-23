const router = require("express").Router();

const ServicosPrestadosController = require("../controllers/servicoPrestadoController");
const checkToken = require("../helpers/check-tokken");

router.post(
  "/servicoPrestado",
  checkToken,
  ServicosPrestadosController.cadastrarservicoprestado
);
router.get(
  "/servicosPrestados",
  checkToken,
  ServicosPrestadosController.servicosprestados
);
router.get(
  "/servicoPrestado/:id",
  checkToken,
  ServicosPrestadosController.servicoprestado
);
router.get(
  "/servicosPrestados/:refObra",
  checkToken,
  ServicosPrestadosController.servicoprestadoobra
);
router.delete(
  "/deleteServicoPrestado/:id",
  checkToken,
  ServicosPrestadosController.deletaservicoprestado
);

module.exports = router;

const router = require("express").Router();

const NumerosObraController = require("../controllers/numerosObraController");
const checkToken = require("../helpers/check-tokken");

router.post(
  "/cadastraNumerosObra",
  checkToken,
  NumerosObraController.cadastranumerosobra
);
router.get(
  "/numerosObra/:refObra",
  checkToken,
  NumerosObraController.numerosobra
);
router.delete(
  "/apagaNumeros/:id",
  checkToken,
  NumerosObraController.apaganumeros
);

module.exports = router;

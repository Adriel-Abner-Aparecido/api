const DescontosController = require("../controllers/descontosController");

const router = require("express").Router();

const checkToken = require("../helpers/check-tokken");

router.post("/desconto", checkToken, DescontosController.desconto);
router.get("/desconto/:relUser", checkToken, DescontosController.descontos);
router.delete(
  "/apagadesconto/:id",
  checkToken,
  DescontosController.apagadesconto
);

module.exports = router;

const router = require('express').Router();

const NumerosObraController = require('../controllers/numerosObraController');

router.post('/cadastraNumerosObra', NumerosObraController.cadastranumerosobra);
router.get('/numerosObra/:refObra', NumerosObraController.numerosobra);
router.delete('/apagaNumeros/:id', NumerosObraController.apaganumeros);

module.exports = router;
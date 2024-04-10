const router = require('express').Router()

const EtapasController = require('../controllers/etapasController');

router.post('/cadastroEtapa', EtapasController.cadastraretapa);
router.get('/etapas', EtapasController.etapas);
router.get('/refEtapas/:refEtapa', EtapasController.etapasservico);
router.get('/refEtapa/:id', EtapasController.etapa);
router.put('/atualizaEtapa/:id', EtapasController.atualizaetapa);
router.delete('/deleteEtapa/:id', EtapasController.deletaetapa);

module.exports = router
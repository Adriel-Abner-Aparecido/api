const router = require('express').Router();

const ServicosController = require('../controllers/servicosController');

router.post('/cadastroServico', ServicosController.cadastrarservico);
router.get('/servicos', ServicosController.verservicos);
router.get('/servico/:id', ServicosController.verervico);
router.put('/atualizaServico/:id', ServicosController.atualizaservico);
router.delete('/deleteServico/:id', ServicosController.deletarservico);

module.exports = router
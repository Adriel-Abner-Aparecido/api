const router = require('express').Router()

const ServicosPrestadosController = require('../controllers/servicoPrestadoController');

router.post('/servicoPrestado', ServicosPrestadosController.cadastrarservicoprestado);
router.get('/servicoPrestado/:id', ServicosPrestadosController.servicoprestado);
router.get('/servicosPrestados/:refObra', ServicosPrestadosController.servicoprestadoobra);
router.delete('/deleteServicoPrestado/:id', ServicosPrestadosController.deletaservicoprestado);

module.exports = router
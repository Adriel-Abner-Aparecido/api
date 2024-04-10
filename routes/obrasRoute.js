const router = require('express').Router();

const ObrasController = require('../controllers/ObrasController');

router.post('/castrarObra', ObrasController.cadastoobras);
router.get('/verObras', ObrasController.verobras);
router.get('/Obra/:id', ObrasController.verobra);
router.put('/atualizaObra/:id', ObrasController.atualizaobra);

module.exports = router;
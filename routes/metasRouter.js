const router = require('express').Router();

const MetaController = require('../controllers/metaController');

router.post('/meta', MetaController.cadastrarmeta);
router.post('/metaObra', MetaController.cadastrarmetaobra);
router.post('/metaUser', MetaController.cadastrarmetausuario);

router.get('/meta', MetaController.metas);
router.get('/meta/:id', MetaController.meta);
router.get('/metaObra/:relObra', MetaController.metaobra);
router.get('/metaUser/:relUser', MetaController.metausuario);

router.put('/meta/:id', MetaController.atualizameta);
router.put('/metaObra/:relObra', MetaController.atualizametaobra);
router.put('/metaUser/:relUser', MetaController.atualizametausuario);

module.exports = router
const router = require('express').Router();

const LoginController = require('../controllers/loginController');

router.post('/login', LoginController.login);
router.get('/checkuser', LoginController.checkUser);

module.exports = router;
const router = require('express').Router();

const AvatarController = require('../controllers/avatarController');

const { upload } = require('../helpers/image-uploads');

router.patch('/avatar', upload.single('image'), AvatarController.avatar);
router.get('/avatar/:id', AvatarController.veravatar);

module.exports = router;
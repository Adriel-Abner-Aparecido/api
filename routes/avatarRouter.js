const router = require("express").Router();

const AvatarController = require("../controllers/avatarController");
const checkToken = require("../helpers/check-tokken");

const { upload } = require("../helpers/image-uploads");

router.patch(
  "/avatar",
  checkToken,
  upload.single("image"),
  AvatarController.avatar
);
router.get("/avatar/:id", checkToken, AvatarController.veravatar);

module.exports = router;

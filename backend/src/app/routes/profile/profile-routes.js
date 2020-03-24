const router = require('express').Router();

const { profileController } = require('../../controllers');

router.get('/', profileController.showProfile);

module.exports = router;

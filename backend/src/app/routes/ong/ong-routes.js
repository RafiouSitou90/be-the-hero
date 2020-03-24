const router = require('express').Router();

const { ongController } = require('../../controllers');

router.get('/', ongController.getOngList);
router.post('/', ongController.createOng);

module.exports = router;

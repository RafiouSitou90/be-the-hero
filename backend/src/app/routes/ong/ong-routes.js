const router = require('express').Router();

const { ongController } = require('../../controllers');

router.get('/', ongController.getOngList);
router.post('/', ongController.createOng);
router.put('/update/:id', ongController.updateOngById);
router.delete('/delete/:id', ongController.deleteOngById);

module.exports = router;

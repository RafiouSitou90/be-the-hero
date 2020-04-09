const router = require('express').Router();
const { celebrate, Segments } = require('celebrate');

const { ongController } = require('../../controllers');
const { creationValidator } = require('../../validations/ong/ongValidations');

const creationSchema = creationValidator();

router.post('/', celebrate({ [Segments.BODY]: creationSchema }), ongController.createOng);

router.get('/', ongController.getOngList);

router.put('/update/:id', ongController.updateOngById);

router.delete('/delete/:id', ongController.deleteOngById);

module.exports = router;

const router = require('express').Router();
const { celebrate, Segments } = require('celebrate');

const { profileController } = require('../../controllers');
const { profileValidator } = require('../../validations/profile/profileValidation');

const profileSchema = profileValidator();

router.get('/', celebrate({ [Segments.HEADERS]: profileSchema }), profileController.showProfile);

module.exports = router;

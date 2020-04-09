const router = require('express').Router();
const { celebrate, Segments } = require('celebrate');

const { authController } = require('../../controllers');
const { loginValidator } = require('../../validations/auth/loginValidation');

const loginSchema = loginValidator();

router.post('/login', celebrate({ [Segments.BODY]: loginSchema }), authController.authentication);

module.exports = router;

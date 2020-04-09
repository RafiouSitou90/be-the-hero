const { Joi } = require('celebrate');

const loginValidator = () => {
	return Joi.object().keys({
		id: Joi.string()
			.required()
			.trim(),
		password: Joi.string()
			.required()
			.trim()
	});
};

module.exports = { loginValidator };

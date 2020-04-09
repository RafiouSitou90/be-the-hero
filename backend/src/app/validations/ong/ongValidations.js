const { Joi } = require('celebrate');

const creationValidator = () => {
	return Joi.object().keys({
		name: Joi.string()
			.required()
			.min(3)
			.trim(),
		password: Joi.string()
			.required()
			.min(8)
			.max(25)
			.trim(),
		email: Joi.string()
			.email()
			.required()
			.trim(),
		whatsapp: Joi.string()
			.required()
			.length(11)
			.trim(),
		city: Joi.string()
			.required()
			.trim(),
		uf: Joi.string()
			.required()
			.length(2)
			.trim()
	});
};

module.exports = { creationValidator };

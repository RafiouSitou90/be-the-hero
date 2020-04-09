const { Joi } = require('celebrate');

const profileValidator = () => {
	return Joi.object({
		authorization: Joi.string().required()
	}).unknown();
};

module.exports = { profileValidator };

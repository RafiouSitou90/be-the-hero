const { Joi } = require('celebrate');

const creationValidator = () => {
	return Joi.object().keys({
		title: Joi.string()
			.required()
			.trim(),
		description: Joi.string()
			.required()
			.trim(),
		value: Joi.number().required()
	});
};

const deletingValidator = () => {
	return Joi.object().keys({
		id: Joi.number().required()
	});
};

const incidentHeaderValidator = () => {
	return Joi.object({
		authorization: Joi.string().required()
	}).unknown();
};

const updatingValidator = () => {
	return Joi.object().keys({
		title: Joi.string()
			.required()
			.trim(),
		description: Joi.string()
			.required()
			.trim(),
		value: Joi.number().required()
	});
};

const paginationValidator = () => {
	return Joi.object().keys({
		page: Joi.number(),
		limit: Joi.number()
	});
};

module.exports = {
	creationValidator,
	deletingValidator,
	updatingValidator,
	paginationValidator,
	incidentHeaderValidator
};

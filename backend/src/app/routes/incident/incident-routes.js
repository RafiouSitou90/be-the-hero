const router = require('express').Router();
const { celebrate, Segments } = require('celebrate');

const { incidentController } = require('../../controllers');

const {
	creationValidator,
	deletingValidator,
	updatingValidator,
	paginationValidator,
	incidentHeaderValidator
} = require('../../validations/incident/incidentValidation');

const creationSchema = creationValidator();
const deletingSchema = deletingValidator();
const updatingSchema = updatingValidator();
const paginationSchema = paginationValidator();
const incidentHeaderSchema = incidentHeaderValidator();

router.get(
	'/',
	celebrate({ [Segments.QUERY]: paginationSchema }),
	incidentController.getIncidentList
);

router.post(
	'/',
	celebrate({ [Segments.BODY]: creationSchema, [Segments.HEADERS]: incidentHeaderSchema }),
	incidentController.createIncident
);

router.put(
	'/update/:id',
	celebrate({ [Segments.BODY]: updatingSchema, [Segments.HEADERS]: incidentHeaderSchema }),
	incidentController.updateIncidentById
);

router.delete(
	'/delete/:id',
	celebrate({ [Segments.PARAMS]: deletingSchema, [Segments.HEADERS]: incidentHeaderSchema }),
	incidentController.deleteIncidentById
);

module.exports = router;

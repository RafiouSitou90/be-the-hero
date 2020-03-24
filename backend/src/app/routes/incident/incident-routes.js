const router = require('express').Router();

const { incidentController } = require('../../controllers');

router.get('/', incidentController.getIncidentList);
router.post('/', incidentController.createIncident);
router.put('/update/:id', incidentController.updateIncidentById);
router.delete('/delete/:id', incidentController.deleteIncidentById);

module.exports = router;

const authController = require('./auth/authController');
const ongController = require('./ong/ongController');
const incidentController = require('./incident/incidentController');
const profileController = require('./profile/profileController');

module.exports = { ongController, incidentController, profileController, authController };

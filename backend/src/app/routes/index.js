const authRoutes = require('./auth/auth-routes');
const ongRoutes = require('./ong/ong-routes');
const incidentRoutes = require('./incident/incident-routes');
const profileRoutes = require('./profile/profile-routes');

module.exports = { ongRoutes, incidentRoutes, profileRoutes, authRoutes };

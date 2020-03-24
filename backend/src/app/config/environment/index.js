const config = {
	APP_PORT: process.env.APP_PORT || 4000,
	APP_SERVER_NAME: process.env.APP_SERVER_NAME || 'http://localhost',
	APP_SECRET: process.env.APP_SECRET || ''
};

module.exports = config;

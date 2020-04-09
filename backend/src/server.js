const app = require('./app');
const { config } = require('./app/config');

app.listen(config.APP_PORT, () =>
	console.log('App is running and listening on %s:%d', config.APP_SERVER_NAME, config.APP_PORT)
);

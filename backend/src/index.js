const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { config } = require('./app/config');
const { ongRoutes, incidentRoutes, profileRoutes, authRoutes } = require('./app/routes');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/ongs', ongRoutes);
app.use('/incidents', incidentRoutes);
app.use('/profile', profileRoutes);

app.listen(config.APP_PORT, () =>
	console.log('App is running and listening on %s:%d', config.APP_SERVER_NAME, config.APP_PORT)
);

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

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

app.use(errors());

module.exports = app;

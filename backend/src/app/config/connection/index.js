const knex = require('knex');

const knexConfig = require('../../../../knexfile');

const config = process.env.NODE_ENV === 'test' ? knexConfig.test : knexConfig.development;

const connection = knex(config);

module.exports = connection;

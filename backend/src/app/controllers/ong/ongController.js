const crypto = require('crypto');

const { DBConnection } = require('../../config');

const createOng = async (req, res) => {
	const { name, email, whatsapp, city, uf } = req.body;

	const id = crypto
		.randomBytes(4)
		.toString('HEX')
		.toUpperCase();

	await DBConnection.table('ong').insert({ id, name, email, whatsapp, city, uf });

	return res.json({ id });
};

const getOngList = async (req, res) => {
	const ongs = await DBConnection.table('ong')
		.select('*')
		.orderBy('name', 'ASC');

	return res.json({ ongs });
};

module.exports = {
	createOng,
	getOngList
};

const bcrypt = require('bcrypt');

const generateUniqueId = require('../../functions/generateUniqueId');
const { DBConnection } = require('../../config');

/**
 * * CREATE NEW ONG
 */
const createOng = async (req, res) => {
	const { name, email, whatsapp, city, uf } = req.body;
	let { password } = req.body;
	const id = generateUniqueId();

	const salt = bcrypt.genSaltSync(10);
	const passwordHash = await bcrypt.hashSync(password, salt);

	password = passwordHash;

	await DBConnection.table('ong').insert({ id, password, name, email, whatsapp, city, uf });
	return res.json({ id });
};

/**
 * * GET LIST OF ONG
 */
const getOngList = async (req, res) => {
	const ongs = await DBConnection.table('ong')
		.select('*')
		.orderBy('name', 'ASC');

	return res.json({ ongs });
};

/**
 * * UPDATE ONG BY ID
 */
const updateOngById = async (req, res) => {
	const { id } = req.params;

	const ong = await DBConnection.table('ong')
		.where('id', id)
		.select('*')
		.first();

	if (!ong) {
		return res.json({ error: 'ONG Not found' });
	}

	const { name, email, whatsapp, city, uf } = req.body;

	const result = await DBConnection.table('ong')
		.where('id', id)
		.update({ name, email, whatsapp, city, uf });

	if (result === 1) {
		return res.status(200).json({ success: 'ONG updated successfully' });
	} else {
		return res.status(400).json({ error: 'ONG update failed' });
	}
};

/**
 * * DELETE ONG BY ID
 */
const deleteOngById = async (req, res) => {
	const { id } = req.params;

	const ong = await DBConnection.table('ong')
		.where('id', id)
		.select('*')
		.first();

	if (!ong) {
		return res.json({ error: 'ONG Not found' });
	}

	const result = await DBConnection.table('ong')
		.where('id', id)
		.delete();

	if (result === 1) {
		return res.status(200).json({ success: 'ONG deleted successfully' });
	} else {
		return res.status(400).json({ error: "ONG can't be deleted" });
	}
};

module.exports = {
	createOng,
	getOngList,
	updateOngById,
	deleteOngById
};

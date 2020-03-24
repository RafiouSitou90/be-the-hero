const { DBConnection } = require('../../config');

const authentication = async (req, res) => {
	const { id } = req.body;

	const ong = await DBConnection.table('ong')
		.where('id', id)
		.select('name')
		.first();

	if (!ong) {
		return res.status(400).json({ error: 'No ONG with this ID' });
	}

	return res.json({ ong });
};

module.exports = { authentication };

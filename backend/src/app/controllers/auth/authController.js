const bcrypt = require('bcrypt');
const { DBConnection } = require('../../config');

const authentication = async (req, res) => {
	const { id, password } = req.body;

	const ong = await DBConnection.table('ong')
		.where('id', id)
		.select('name', 'password')
		.first();

	if (!ong) {
		return res.status(400).json({ error: 'No ONG with this ID' });
	}

	if (!(await bcrypt.compare(password, ong.password)))
		return res.status(400).json({ error: 'Password incorrect' });

	return res.json({ ong });
};

module.exports = { authentication };

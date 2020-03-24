const { DBConnection } = require('../../config');

const showProfile = async (req, res) => {
	const ong_id = req.headers.authorization;

	const incidents = await DBConnection.table('incident')
		.where('ong_id', ong_id)
		.select('*');

	return res.json({ incidents });
};

module.exports = { showProfile };

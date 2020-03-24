const { DBConnection } = require('../../config');

const createIncident = async (req, res) => {
	const { title, description, value } = req.body;
	const ong_id = req.headers.authorization;

	const [id] = await DBConnection.table('incident').insert({
		title,
		description,
		value,
		ong_id
	});

	return res.json({ id });
};

const getIncidentList = async (req, res) => {
	const { page = 1, limit = 5 } = req.query;

	const [count] = await DBConnection.table('incident').count();

	const incidents = await DBConnection.table('incident')
		.join('ong', 'ong.id', '=', 'incident.ong_id')
		.limit(limit)
		.offset((page - 1) * limit)
		.select(['incident.*', 'ong.name', 'ong.email', 'ong.whatsapp', 'ong.city', 'ong.uf'])
		.orderBy('title', 'ASC');

	res.header('X-Total-Count', count['count(*)']);

	return res.json({ incidents });
};

const deleteIncidentById = async (req, res) => {
	const { id } = req.params;
	const ong_id = req.headers.authorization;

	const incident = await DBConnection.table('incident')
		.where('id', id)
		.select('ong_id')
		.first();

	if (incident.ong_id !== ong_id) {
		return res.status(401).json({ error: 'Operation not permitted' });
	}

	await DBConnection.table('incident')
		.where('id', id)
		.delete();

	return res.status(204).send();
};

const updateIncidentById = async (req, res) => {};

module.exports = {
	createIncident,
	getIncidentList,
	deleteIncidentById,
	updateIncidentById
};

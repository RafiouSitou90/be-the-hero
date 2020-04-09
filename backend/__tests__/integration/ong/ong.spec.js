const request = require('supertest');

const app = require('../../../src/app');
const { DBConnection } = require('../../../src/app/config');

describe('ONG', () => {
	beforeEach(async () => {
		await DBConnection.migrate.rollback();
		await DBConnection.migrate.latest();
	});

	afterAll(async () => {
		await DBConnection.destroy();
	});

	it('Should be able to create a new ONG', async () => {
		const response = await request(app)
			.post('/ongs')
			.send({
				password: '12345678',
				name: 'ONG-EGGS',
				email: 'ong-eggs@ong-eggs.com.br',
				whatsapp: '12345678900',
				city: 'Brasilia-DF',
				uf: 'DF'
			});

		expect(response.body).toHaveProperty('id');
		expect(response.body.id).toHaveLength(8);

		const result = await request(app).delete(`/ongs/delete/${response.body.id}`);

		expect(result.body).toHaveProperty('success');
	});
});

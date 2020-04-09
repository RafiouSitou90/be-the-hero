const request = require('supertest');

const app = require('../../../src/app');
const { DBConnection } = require('../../../src/app/config');

describe('AUTHENTICATION', () => {
	beforeEach(async () => {
		await DBConnection.migrate.rollback();
		await DBConnection.migrate.latest();
	});

	afterAll(async () => {
		await DBConnection.destroy();
	});

	it('Should be able to log in', async () => {
		const ong = await request(app)
			.post('/ongs')
			.send({
				password: '12345678',
				name: 'ONG-EGGS',
				email: 'ong-tests@ong-test.com.br',
				whatsapp: '12345678900',
				city: 'Brasilia-DF',
				uf: 'DF'
			});

		const response = await request(app)
			.post('/auth/login')
			.send({
				id: ong.body.id,
				password: '12345678'
			});

		expect(response.body).toHaveProperty('ong');
	});
});

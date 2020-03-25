exports.up = function(knex) {
	return knex.schema.createTable('ong', table => {
		table.string('id').primary();
		table.string('password');
		table.string('name').notNullable();
		table
			.string('email')
			.unique()
			.notNullable();
		table.string('whatsapp').notNullable();
		table.string('city').notNullable();
		table.string('uf', 2).notNullable();
		table.datetime('created_at').defaultTo(knex.fn.now());
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable('ong');
};

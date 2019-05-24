const { knexHelper } = require('../src/helpers');

/**
 * @param {import('knex')} knex 
 */
const up = (knex) => knex.schema.createTable('permissions', (table) => {
  table.bigIncrements('id').unsigned();
  table.bigInteger('clientId').unsigned().notNullable()
    .references('id').inTable('clients');
  table.string('code', 100).notNullable().unique();
  table.unique(['code', 'clientId']);
  knexHelper.addUpdatedAt(knex, table);
  knexHelper.addCreatedAt(knex, table);
});

/**
 * @param {import('knex')} knex 
 */
const down = (knex) => knex.schema.dropTable('permissions');

module.exports = { up, down };
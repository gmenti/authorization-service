const { knexHelper } = require('../src/helpers');

/**
 * @param {import('knex')} knex 
 */
const up = (knex) => knex.schema.createTable('clients', (table) => {
  table.bigIncrements('id').unsigned();
  table.string('name', 100).notNullable();
  knexHelper.addUpdatedAt(knex, table);
  knexHelper.addCreatedAt(knex, table);
});

/**
 * @param {import('knex')} knex 
 */
const down = (knex) => knex.schema.dropTable('clients');

module.exports = { up, down };
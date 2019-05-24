const { knexHelper } = require('../src/helpers');

/**
 * @param {import('knex')} knex 
 */
const up = (knex) => knex.schema.createTable('roles', (table) => {
  table.bigIncrements('id').unsigned();
  table.string('title').notNullable();
  table.string('description', 500).nullable();
  table.bigInteger('clientId').unsigned().notNullable()
    .references('id').inTable('clients');
  knexHelper.addUpdatedAt(knex, table);
  knexHelper.addCreatedAt(knex, table);
});

/**
 * @param {import('knex')} knex 
 */
const down = (knex) => knex.schema.dropTable('roles');

module.exports = { up, down };
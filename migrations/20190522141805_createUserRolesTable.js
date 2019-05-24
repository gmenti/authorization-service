const { knexHelper } = require('../src/helpers');

/**
 * @param {import('knex')} knex 
 */
const up = (knex) => knex.schema.createTable('userRoles', (table) => {
  table.bigInteger('userId').unsigned().notNullable()
    .references('id').inTable('users');
  table.bigInteger('roleId').unsigned().notNullable()
    .references('id').inTable('roles');
  table.unique(['userId', 'roleId']);
  knexHelper.addCreatedAt(knex, table);
});

/**
 * @param {import('knex')} knex 
 */
const down = (knex) => knex.schema.dropTable('userRoles');

module.exports = { up, down };
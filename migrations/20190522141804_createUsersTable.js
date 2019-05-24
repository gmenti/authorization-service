const { knexHelper } = require('../src/helpers');

/**
 * @param {import('knex')} knex 
 */
const up = (knex) => knex.schema.createTable('users', (table) => {
  table.bigIncrements('id').unsigned();
  table.bigInteger('clientId').unsigned().notNullable()
    .references('id').inTable('clients');
  table.string('fullName', 100).notNullable();
  table.string('emailAddress', 100).notNullable();
  table.string('phoneNumber', 20).notNullable();
  table.string('documentNumber', 20).notNullable();
  table.string('documentType', 20).notNullable();
  table.string('passwordHash', 512).notNullable();
  table.boolean('blocked').notNullable().defaultTo(false);
  table.dateTime('blockedAt').nullable();
  table.unique(['clientId', 'emailAddress']);
  table.unique(['clientId', 'phoneNumber']);
  table.unique(['clientId', 'documentNumber', 'documentType']);
  knexHelper.addUpdatedAt(knex, table);
  knexHelper.addCreatedAt(knex, table);
});

/**
 * @param {import('knex')} knex 
 */
const down = (knex) => knex.schema.dropTable('users');

module.exports = { up, down };
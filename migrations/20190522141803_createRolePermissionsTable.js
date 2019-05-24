const { knexHelper } = require('../src/helpers');

/**
 * @param {import('knex')} knex 
 */
const up = (knex) => knex.schema.createTable('rolePermissions', (table) => {
  table.bigInteger('roleId').notNullable().unsigned()
    .references('id').inTable('roles');
  table.bigInteger('permissionId').notNullable().unsigned()
    .references('id').inTable('permissions');
  table.primary(['roleId', 'permissionId']);
  knexHelper.addCreatedAt(knex, table);
});

/**
 * @param {import('knex')} knex 
 */
const down = (knex) => knex.schema.dropTable('rolePermissions');

module.exports = { up, down };
class KnexHelper {
  /**
   * @param {import('knex')} knex
   * @param {import('knex').TableBuilder} tableBuilder
   * @param {String} [fieldName='updatedAt']
   */
  addUpdatedAt(knex, tableBuilder, fieldName = 'updatedAt') {
    return tableBuilder
      .dateTime(fieldName)
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  }

  /**
   * @param {import('knex')} knex
   * @param {import('knex').TableBuilder} tableBuilder
   * @param {String} [fieldName='createdAt']
   */
  addCreatedAt(knex, tableBuilder, fieldName = 'createdAt') {
    return tableBuilder
      .dateTime(fieldName)
      .notNullable()
      .defaultTo(knex.fn.now());
  }
}

module.exports = KnexHelper;

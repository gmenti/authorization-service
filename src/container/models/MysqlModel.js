class MysqlModel {
  /**
   * @param {import('knex')} database 
   */
  constructor(database) {
    this.database = database;
  }

  /**
   * @param {import('knex').QueryBuilder} query 
   * @param {import('knex').Transaction} trx
   * @return {import('knex').QueryBuilder}
   */
  transactionable(query, trx) {
    if (!trx) {
      return query;
    }
    return query.transacting(trx);
  }
}

module.exports = MysqlModel;

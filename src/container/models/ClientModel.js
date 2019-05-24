const MysqlModel = require('./MysqlModel');

/**
 * @typedef Client
 * @type {Object}
 * @property {String} id
 * @property {String} name
 * @property {Date} createdAt
 */

class ClientModel extends MysqlModel {

  /**
   * @param {import('knex').Transaction?} trx
   * @return {Promise<Client[]>}
   */
  async all(trx = null) {
    const records = await this.transactionable(
      this.database
        .table('clients')
        .select('id', 'name', 'createdAt')
        .orderBy('id', 'asc')
    , trx);

    return records;
  } 
  
  /**
   * @param {String} id
   * @param {import('knex').Transaction?} trx
   * @return {Promise<Client?>}
   */
  async getById(id, trx = null) {
    const record = await this.transactionable(
      this.database
        .table('clients')
        .select('id', 'name', 'createdAt')
        .where('id', id)
        .first()
    , trx);

    return record;
  }

  /**
   * @param {Object} data
   * @param {String} data.name
   * @param {import('knex').Transaction?} trx
   * @return {Promise<String>}
   */
  async create(data, trx = null) {
    const [id] = await this.transactionable(
      this.database
        .table('clients')
        .insert(data)
    , trx);

    return id;
  }

  /**
   * @param {String} id
   * @param {Object} data
   * @param {String} data.name
   * @param {import('knex').Transaction} trx
   * @return {Promise<Boolean>}
   */
  async update(id, data, trx = null) {
    const updatedCount = await this.transactionable(
      this.database
        .table('clients')
        .where('id', id)
        .update(data)
    , trx);

    return updatedCount > 0;
  }
}

module.exports = ClientModel;

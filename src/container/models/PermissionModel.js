const MysqlModel = require('./MysqlModel');

/**
 * @typedef Permission
 * @type {Object}
 * @property {String} id
 * @property {String} code
 * @property {Date} createdAt
 */

/**
 * @typedef UpdatableData
 * @type {Object}
 * @property {String} name
 */

class PermissionModel extends MysqlModel {

  /**
   * @param {Object} data
   * @param {String} data.clientId
   * @param {String} data.code
   * @param {import('knex').Transaction?} trx
   * @return {Promise<Boolean>}
   */
  async exists({ clientId, code }, trx = null) {
    const result = await this.transactionable(
      this.database
        .table('permissions')
        .count()
        .where('clientId', clientId)
        .where('code', code)
        .first()
    , trx);

    const count = parseInt(result['count(*)'], 10);

    return count > 0;
  }

  /**
   * @param {String} clientId
   * @return {Promise<Permission[]>}
   */
  async list(clientId) {
    const records = await this.database
      .select('id', 'code', 'createdAt')
      .table('permissions')
      .where('clientId', clientId)
      .orderBy('code', 'asc');

    return records;
  }

  /**
   * @param {String} roleId
   * @return {Promise<Permission[]>}
   */
  async listByRoleId(roleId) {
    const records = await this.database
      .select(
        'permissions.id',
        'permissions.code',
        'permissions.createdAt'
      )
      .table('permissions')
      .join('rolePermissions', 'rolePermissions.permissionId', 'permissions.id')
      .where('rolePermissions.roleId', roleId)
      .orderBy('code', 'asc');

    return records;
  }

  /**
   * @param {Object} data
   * @param {String} data.clientId
   * @param {String} data.code
   * @param {import('knex').Transaction?} trx
   * @return {Promise<String>}
   */
  async create(data, trx = null) {
    const [id] = await this.transactionable(
      this.database
        .table('permissions')
        .insert(data)
    , trx);

    return id;
  }

  /**
   * @param {String} id
   * @param {import('knex').Transaction?} trx
   * @return {Promise<Permission?>}
   */
  async getById(id, trx = null) {
    const record = await this.transactionable(
      this.database
        .table('permissions')
        .select('id', 'code', 'createdAt')
        .where('id', id)
        .first()
    , trx);

    return record;
  }

  /**
   * @param {String} id
   * @param {import('knex').Transaction?} trx
   * @return {Promise<Boolean>}
   */
  async delete(id, trx = null) {
    const deletedCount = await this.transactionable(
      this.database
        .table('permissions')
        .where('id', id)
        .delete()
    , trx);

    return deletedCount > 0;
  }
}

module.exports = PermissionModel;

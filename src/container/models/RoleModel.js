const MysqlModel = require('./MysqlModel');

/**
 * @typedef Role
 * @type {Object}
 * @property {String} id
 * @property {String} title
 * @property {String?} description
 * @property {Date} updatedAt
 * @property {Date} createdAt
 */

/**
 * @typedef RoleWithPermissions
 * @type {Role}
 * @property {String[]} permissions
 */

class RoleModel extends MysqlModel {

  /**
   * @param {String} roleId 
   * @param {import('knex').Transaction?} trx
   * @return {Promise<String[]>} 
   */
  async getPermissionIds(roleId, trx = null) {
    const records = await this.transactionable(
      this.database
        .table('rolePermissions')
        .select('permissionId')
        .where('roleId', roleId)
    , trx);

    return records.map(record => record.permissionId);
  }

  /**
   * @param {String} roleId 
   * @param {String[]} permissionIds 
   * @param {import('knex').Transaction?} trx
   * @return {Promise<void>}
   */
  async attachPermissionIds(roleId, permissionIds, trx = null) {
    await this.transactionable(
      this.database
        .table('rolePermissions')
        .insert(
          permissionIds.map(permissionId => ({
            permissionId,
            roleId,
          }))
        )
    , trx);
  }

  /**
   * @param {String} roleId 
   * @param {String[]} permissionIds 
   * @param {import('knex').Transaction?} trx
   * @return {Promise<void>}
   */
  async detachPermissionIds(roleId, permissionIds, trx = null) {
    await this.transactionable(
      this.database
        .table('rolePermissions')
        .where('roleId', roleId)
        .whereIn('permissionId', permissionIds)
        .delete()
    , trx);
  }

  /**
   * @param {String} id
   * @param {import('knex').Transaction?} trx
   * @return {Promise<Role?>}
   */
  async getById(id, trx = null) {
    const record = await this.transactionable(
      this.database
        .table('roles')
        .select('id', 'title', 'description', 'updatedAt', 'createdAt')
        .where('id', id)
        .first()
    , trx);

    return record;
  }

  /**
   * @param {String} clientId
   * @return {Promise<Role[]>}
   */
  async list(clientId) {
    const records = await this.database
      .select('id', 'title', 'description', 'updatedAt', 'createdAt')
      .table('roles')
      .where('clientId', clientId)
      .orderBy('title', 'asc');

    return records;
  }

  /**
   * @param {Object} data
   * @param {String} data.clientId
   * @param {String} data.title
   * @param {String?} data.description
   * @param {import('knex').Transaction?} trx
   * @return {Promise<String>}
   */
  async create(data, trx = null) {
    const [id] = await this.transactionable(
      this.database
        .table('roles')
        .insert(data)
    , trx);

    return id;
  }

  /**
   * @param {String} id
   * @param {Object} data
   * @param {String} data.title
   * @param {String?} data.description
   * @param {import('knex').Transaction?} trx
   * @return {Promise<Boolean>}
   */
  async update(id, data, trx = null) {
    const updatedCount = await this.transactionable(
      this.database
        .table('roles')
        .where('id', id)
        .update(data)
    , trx);

    return updatedCount > 0;
  }

  /**
   * @param {String} id
   * @param {import('knex').Transaction?} trx
   * @return {Promise<Boolean>}
   */
  async delete(id, trx = null) {
    const deletedCount = await this.transactionable(
      this.database
        .table('roles')
        .where('id', id)
        .delete()
    , trx);

    return deletedCount > 0;
  }

  /**
   * @param {String} id
   * @param {import('knex').Transaction?} trx
   * @return {Promise<void>}
   */
  async detachAllPermissions(id, trx = null) {
    await this.transactionable(
      this.database
        .table('rolePermissions')
        .where('roleId', id)
        .delete()
    , trx);
  }
}

module.exports = RoleModel;

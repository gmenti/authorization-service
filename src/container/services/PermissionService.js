const { ResourceNotFoundError, DuplicatedResourceError } = require('../../errors');

class PermissionService {
  /**
   * @param {import('../index').ServiceContext} context 
   */
  constructor(context) {
    this.mysqlClient = context.mysqlClient;
    this.permissionModel = context.permissionModel;
  }

  /**
   * @param {String} clientId
   * @return {Promise<import('../models/PermissionModel').Permission[]>}
   */
  async list(clientId) {
    const permissions = await this.permissionModel.list(clientId);
    return permissions;
  }

  /**
   * @param {Object} data
   * @param {String} data.clientId
   * @param {String} data.code
   * @return {Promise<import('../models/PermissionModel').Permission>}
   */
  async create(data) {
    const permission = await this.mysqlClient.transaction(async (trx) => {
      const exists = await this.permissionModel.exists({
        clientId: data.clientId,
        code: data.code,
      }, trx);

      if (exists) {                          
        throw new DuplicatedResourceError();                                                      
      }

      const permissionId = await this.permissionModel.create(data, trx);

      const permission = await this.permissionModel.getById(permissionId, trx);

      return permission;
    });

    return permission;
  }

  /**
   * @param {String} id
   * @return {Promise<void>}
   */
  async delete(id) {
    const deleted = await this.permissionModel.delete(id);
    if (!deleted) {
      throw new ResourceNotFoundError();
    }
  }
}

module.exports = PermissionService;

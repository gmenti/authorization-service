const { ResourceNotFoundError } = require('../../errors');

class RoleService {

  /**
   * @param {import('../index').ServiceContext} context 
   */
  constructor(context) {
    this.mysqlClient = context.mysqlClient;
    this.roleModel = context.roleModel;
    this.permissionsModel = context.permissionModel;
  }

  /**
   * @param {String} id
   * @return {Promise<import('../models/RoleModel').Role>}
   */
  async findById(id) {
    const role = await this.roleModel.getById(id);
    if (!role) {
      throw new ResourceNotFoundError();
    }
    return role;
  }

  /**
   * @param {String} clientId
   * @return {Promise<import('../models/RoleModel').Role[]>}
   */
  async list(clientId) {
    const roles = await this.roleModel.list(clientId);
    return roles;
  }

  /**
   * @param {Object} data
   * @param {String} data.clientId
   * @param {String} data.title
   * @param {String?} data.description
   * @param {String[]} data.permissionIds
   * @return {Promise<import('../models/RoleModel').Role>}
   */
  async create({ permissionIds, ...roleData }) {
    const role = await this.mysqlClient.transaction(async (trx) => {
      const roleId = await this.roleModel.create(roleData, trx);

      await this.roleModel.attachPermissionIds(roleId, permissionIds, trx);

      const role = await this.roleModel.getById(roleId, trx);

      return role;
    });

    return role;
  }

  /**
   * @param {String} id 
   * @param {Object} data
   * @param {String} data.title
   * @param {String?} data.description
   * @param {String[]} data.permissionIds
   * @return {Promise<import('../models/RoleModel').Role>}
   */
  async update(id, { permissionIds, ...roleData }) {
    const role = await this.mysqlClient.transaction(async (trx) => {
      const updated = await this.roleModel.update(id, roleData, trx);

      if (!updated) {
        throw new ResourceNotFoundError();
      }

      if (permissionIds) {
        const createdPermissionIds = await this.roleModel
          .getPermissionIds(id, trx);

        const permissionIdsToAttach = permissionIds
          .filter(permissionId => !createdPermissionIds.includes(permissionId));

        const permissionIdsToDetach = createdPermissionIds
          .filter(createdPermissionId => !permissionIds.includes(createdPermissionId));

        await Promise.all([
          this.roleModel.attachPermissionIds(id, permissionIdsToAttach, trx),
          this.roleModel.detachPermissionIds(id, permissionIdsToDetach, trx),
        ]);
      }

      const role = await this.roleModel.getById(id, trx);
      
      return role;
    });

    return role;
  }

  /**
   * @param {String} id
   * @return {Promise<void>}
   */
  async delete(id) {
    await this.mysqlClient.transaction(async (trx) => {
      await this.roleModel.detachAllPermissions(id, trx);

      const deleted = await this.roleModel.delete(id, trx);
      if (!deleted) {
        throw new ResourceNotFoundError();
      }
    });
  }

  /**
   * @param {String} id
   * @return {Promise<import('../models/PermissionModel').Permission[]>}
   */
  async getPermissions(id) {
    const permissions = await this.permissionsModel.listByRoleId(id);
    return permissions;
  }
}

module.exports = RoleService;

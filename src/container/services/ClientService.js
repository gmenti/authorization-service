const { ResourceNotFoundError } = require('../../errors');

class ClientService {
  /**
   * @param {import('../index').ServiceContext} context 
   */
  constructor(context) {
    this.mysqlClient = context.mysqlClient;
    this.clientModel = context.clientModel;
    this.permissionModel = context.permissionModel;
  }

  /**
   * @return {Promise<import('../models/ClientModel').Client[]>}
   */
  async list() {
    const clients = await this.clientModel.all();
    return clients;
  }

  /**
   * @param {String} id
   * @return {Promise<import('../models/ClientModel').Client>}
   */
  async findById(id) {
    const client = await this.clientModel.getById(id);
    if (!client) {
      throw new ResourceNotFoundError();
    }
    return client;
  }

  /**
   * @param {Object} data
   * @param {String} data.name
   * @param {String[]} data.permissions
   * @return {Promise<import('../models/ClientModel').Client>}
   */
  async create(data) {
    const client = await this.mysqlClient.transaction(async (trx) => {
      const clientId = await this.clientModel.create({
        name: data.name,
      }, trx);
      
      await Promise.all(
        data.permissions.map(async code => {
          await this.permissionModel.create({
            clientId,
            code,
          }, trx);
        }),
      );

      const client = await this.clientModel.getById(clientId, trx);

      return client;
    });

    return client;
  }

  /**
   * @param {String} id
   * @param {Object} data
   * @param {String} data.name
   * @param {String[]} data.permissionsIds
   * @return {Promise<import('../models/ClientModel').Client>}
   */
  async update(id, data) {
    const client = await this.mysqlClient.transaction(async (trx) => {
      const updated = await this.clientModel.update(id, data, trx);
      
      if (!updated) {
        throw new ResourceNotFoundError(); 
      }

      const client = await this.clientModel.getById(id, trx);
      return client;
    });

    return client;
  }
}

module.exports = ClientService;

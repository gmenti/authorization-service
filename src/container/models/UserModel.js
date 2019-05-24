const MysqlModel = require('./MysqlModel');

/**
 * @typedef InsertUserData
 * @type {Object}
 * @property {String} fullName
 * @property {String} emailAddress
 * @property {String} phoneNumber
 */

/**
 * @typedef UpdateUserData
 * @type {Object}
 * @property {String} id
 * @property {String} fullName
 * @property {String} emailAddress
 * @property {String} phoneNumber
 */

/**
 * @typedef UserData
 * @type {Object}
 * @property {String} id
 * @property {String} fullName
 * @property {String} emailAddress
 * @property {String} phoneNumber
 * @property {Boolean} blocked
 * @property {Date} blockedAt
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef IdentifiersData
 * @type {Object}
 * @property {String} emailAddress
 * @property {String} phoneNumber
 */

class UserModel extends MysqlModel {
  /**
   * @param {String} id
   * @return {Promise<UserData?>}
   */
  async getById(id) {
    const user = await this.database
      .table('users')
      .where('id', id)
      .first();

    return user;
  }

  /**
   * @param {IdentifiersData} data
   * @return {Promise<UserData?>}
   */
  async getByIdentifiers(data) {
    const user = await this.database
      .table('users')
      .where('emailAddress', data.emailAddress)
      .orWhere('phoneNumber', data.phoneNumber)
      .first();

    return user;
  }

  /**
   * @return {Promise<UserData[]>}
   */
  async getAll() {
    const users = await this.database
      .table('users');

    return users;
  }

  /**
   * @param {InsertUserData} data
   * @return {Promise<String>}
   */
  async create(data) {
    const [id] = await this.database
      .table('users')
      .insert(data);

    return id;
  }

  /**
   * @param {UpdateUserData} data
   * @return {Promise<void>}
   */
  async update({ id, ...data }) {
    await this.database
      .table('users')
      .where('id', id)
      .update(data);
  }

  /**
   * @param {String} id
   * @return {Promise<void>}
   */
  async block(id) {
    await this.database
      .table('users')
      .where('id', id)
      .where('blocked', false)
      .update({
        blocked: true,
        blockedAt: new Date(),
      });
  }

  /**
   * @param {String} id
   * @return {Promise<void>}
   */
  async unblock(id) {
    await this.database
      .table('users')
      .where('id', id)
      .where('blocked', true)
      .update({
        blocked: false,
        blockedAt: null,
      });
  }
}

module.exports = UserModel;

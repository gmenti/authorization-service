const { AuthenticationError } = require('../../errors');

/**
 * @typedef GetAccountIdFromTokenDto
 * @type {Object}
 * @property {String} accessToken
 * @property {String} balanceType
 */

class AuthService {
  /**
   * @param {import('../index').ServiceContext} context
   */
  constructor(context) {
    this.accountIntegration = context.accountIntegration;
    this.walletIntegration = context.walletIntegration;
    this.customerModel = context.customerModel;
  }

  /**
   * @param {String} customerId
   * @param {String} balanceType
   * @return {Promise<String?>}
   */
  async getAccountId(customerId, balanceType) {
    let accountId = await this.customerModel.getAccountId(customerId);

    if (!accountId) {
      accountId = await this.walletIntegration.getAccountId({
        customerId,
        balanceType,
      });

      this.customerModel.setAccountId(customerId, accountId);
    }

    return accountId;
  }

  /**
   * @param {GetAccountIdFromTokenDto} data
   * @return {Promise<String?>}
   */
  async getAccountIdFromToken({ accessToken, balanceType }) {
    if (accessToken.includes('sessionToken')) {
      const customerId = await this.accountIntegration
        .getCustomerId(accessToken.replace('sessionToken ', ''))
        .catch((err) => {
          const errCode = err 
            && err.response 
            && err.response.data
            && err.response.data.error 
            && err.response.data.error.code;

          if (['12.102', '12.109'].includes(errCode)) {
            throw new AuthenticationError();
          }

          throw err;
        });

      const accountId = await this.getAccountId(customerId, balanceType);

      return accountId;
    }

    throw new AuthenticationError();
  }
}

module.exports = AuthService;

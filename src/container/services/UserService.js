class UserService {
  /**
   * @param {import('../index').ServiceContext} context 
   */
  constructor(context) {
    this.userModel = context.userModel;
  }
}

module.exports = UserService;

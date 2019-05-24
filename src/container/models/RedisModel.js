class RedisModel {
  /**
   * @param {import('ioredis').Redis} client
   */
  constructor(client) {
    this.client = client;
  }
}

module.exports = RedisModel;

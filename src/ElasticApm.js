const elasticApm = require('elastic-apm-node');

class ElasticApm {
  /**
   * @param {Object} opts
   * @param {String} opts.serviceName
   * @param {String} opts.serverUrl 
   */
  constructor(opts) {
    this.opts = opts;
    this.instance = null;
  }

  /**
   * @return {Boolean}
   */
  isValidOpts() {
    return !!(this.opts.serviceName
      && this.opts.serverUrl);
  }

  /**
   * @return {void}
   */
  start() {
    if (!this.isValidOpts()) {
      throw new Error('Invalid configuration');
    }

    if (this.instance) {
      throw new Error('Already started');
    }

    this.instance = elasticApm.start({
      serviceName: this.opts.serviceName,
      serverUrl: this.opts.serverUrl,
    });
  }

  /**
   * @return {void}
   */
  stop() {
    if (!this.instance) {
      throw new Error('Cannot stop without start');
    }

    this.instance.destroy();
    this.instance = null;
  }
}

module.exports = ElasticApm;

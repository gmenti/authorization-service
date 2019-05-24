const env = require('./env');
const http = require('./http');
const logger = require('./logger');
const ElasticApm = require('./ElasticApm');

const elasticApm = new ElasticApm({
  serverUrl: env.APM_SERVER_URL,
  serviceName: env.SERVICE_NAME,
});;

setImmediate(() => {
  // Elastic apm boot
  try {
    elasticApm.start();
    logger.info(__('apm.started'));
  } catch (err) {
    logger.warn(__('apm.error', err.message));
  }

  // Http boot
  http.listen(env.PORT, () => {
    logger.info(__('http.started', env.PORT));
  });
});

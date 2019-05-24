const knex = require('knex');
const Redis = require('ioredis');
const knexFile = require('../../knexfile');
const logger = require('../logger');

/** Integrations */

/** Services */
const ClientService = require('./services/ClientService');
const PermissionService = require('./services/PermissionService');
const RoleService = require('./services/RoleService');

/** Models */
const ClientModel = require('./models/ClientModel');
const PermissionModel = require('./models/PermissionModel');
const RoleModel = require('./models/RoleModel');

const {
  REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, REDIS_DB,
} = require('../env');

const redisClient = new Redis({
  port: REDIS_PORT,
  host: REDIS_HOST,
  password: REDIS_PASSWORD,
  db: REDIS_DB,
});

if (process.env.NODE_ENV === 'development') {
  redisClient.monitor((err, monitor) => {
    if (err) {
      logger.error(err);
      return;
    }
    monitor.on('monitor', (time, args, source, database) => {
      logger.info(`Redis command ${JSON.stringify({ args, source, database })}`);
    });
  });
}

const mysqlClient = knex(knexFile);

/**
 * @typedef Connections
 * @type {Object}
 * @property {import('knex')} mysqlClient
 */

/**
 * @typedef IntegrationContainer
 * @type {Object}
 */

/** @type {IntegrationContainer} */
const integrations = {
  //
};

/**
 * @typedef ModelContainer
 * @property {ClientModel} clientModel
 * @property {PermissionModel} permissionModel
 * @property {RoleModel} roleModel
 */

/** @type {ModelContainer} */
const models = {
  clientModel: new ClientModel(mysqlClient),
  permissionModel: new PermissionModel(mysqlClient),
  roleModel: new RoleModel(mysqlClient),
};

/**
 * @typedef ServiceContext
 * @type {IntegrationContainer & ModelContainer & Connections}
 */

/** @type {ServiceContext} */
const serviceContext = {
  mysqlClient,
  ...integrations,
  ...models,
};

/**
 * @typedef ServiceContainer
 * @type {Object}
 * @property {ClientService} clientService
 * @property {PermissionService} permissionService
 * @property {RoleService} roleService
 */

/** @type {ServiceContainer} */
const services = {
  clientService: new ClientService(serviceContext),
  permissionService: new PermissionService(serviceContext),
  roleService: new RoleService(serviceContext),
};

/**
 * @typedef Container
 * @type {ServiceContainer}
 */

/** @type {Container} */
const container = {
  ...services,
};

module.exports = container;

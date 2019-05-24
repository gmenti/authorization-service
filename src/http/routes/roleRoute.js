const express = require('express');
const schema = require('../schemas/roleSchema');
const schemaValidator = require('../middlewares/schemaValidator');
const Controller = require('../controllers/RoleController');
const container = require('../../container');

const controller = new Controller(container);

const router = express.Router({ mergeParams: true });

router.get(
  '/',
  schemaValidator(schema.list),
  controller.list.bind(controller),
);

router.get(
  '/:roleId',
  schemaValidator(schema.get),
  controller.get.bind(controller),
);

router.post(
  '/',
  schemaValidator(schema.post),
  controller.post.bind(controller),
);

router.put(
  '/:roleId',
  schemaValidator(schema.put),
  controller.put.bind(controller),
);

router.delete(
  '/:roleId',
  schemaValidator(schema.delete),
  controller.delete.bind(controller),
);

router.get(
  '/:roleId/permissions',
  schemaValidator(schema.getPermissions),
  controller.getPermissions.bind(controller),
);

module.exports = router;

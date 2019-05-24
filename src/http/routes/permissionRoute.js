const express = require('express');
const schema = require('../schemas/permissionSchema');
const schemaValidator = require('../middlewares/schemaValidator');
const Controller = require('../controllers/PermissionController');
const container = require('../../container');

const controller = new Controller(container);

const router = express.Router({ mergeParams: true });

router.get(
  '/',
  schemaValidator(schema.list),
  controller.list.bind(controller),
);

router.post(
  '/',
  schemaValidator(schema.post),
  controller.post.bind(controller),
);

router.delete(
  '/:permissionId',
  schemaValidator(schema.delete),
  controller.delete.bind(controller),
);

module.exports = router;

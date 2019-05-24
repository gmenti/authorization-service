const express = require('express');
const schema = require('../schemas/clientSchema');
const schemaValidator = require('../middlewares/schemaValidator');
const Controller = require('../controllers/ClientController');
const container = require('../../container');

const controller = new Controller(container);

const router = express.Router({ mergeParams: true });

router.get(
  '/',
  schemaValidator(schema.list),
  controller.list.bind(controller),
);

router.get(
  '/:clientId',
  schemaValidator(schema.get),
  controller.get.bind(controller),
);

router.post(
  '/',
  schemaValidator(schema.post),
  controller.post.bind(controller),
);

router.put(
  '/:clientId',
  schemaValidator(schema.put),
  controller.put.bind(controller),
);

module.exports = router;

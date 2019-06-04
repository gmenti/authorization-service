const express = require('express');
const schema = require('../schemas/authSchema');
const schemaValidator = require('../middlewares/schemaValidator');
const Controller = require('../controllers/AuthController');
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
  schemaValidator(schema.get),
  controller.get.bind(controller),
);

router.put(
  '/',
  schemaValidator(schema.put),
  controller.put.bind(controller),
);

router.delete(
  '/',
  schemaValidator(schema.delete),
  controller.delete.bind(controller),
);

module.exports = router;

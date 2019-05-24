const Joi = require('joi');

exports.list = Joi.object({
  params: Joi.object({
    clientId: Joi.string().required(),
  }),
});

exports.post = Joi.object({
  params: Joi.object({
    clientId: Joi.string().required(),
  }),
  body: Joi.object({
    code: Joi.string().trim().uppercase().required(),
  }),
});

exports.delete = Joi.object({
  params: Joi.object({
    clientId: Joi.string().required(),
    permissionId: Joi.string().required(),
  }),
});

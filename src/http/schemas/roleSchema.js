const Joi = require('joi');

exports.list = Joi.object({
  params: Joi.object({
    clientId: Joi.string().required(),
  }), 
});

exports.get = Joi.object({
  params: Joi.object({
    clientId: Joi.string().required(),
    roleId: Joi.string().required(),
  }),
});

exports.post = Joi.object({
  params: Joi.object({
    clientId: Joi.string().required(),
  }),
  body: Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().trim(),
    permissionIds: Joi.array().required().unique().items(
      Joi.string().required(),
    ),
  }),
});

exports.put = Joi.object({
  params: Joi.object({
    clientId: Joi.string().required(),
    roleId: Joi.string().required(),
  }),
  body: Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().trim(),
    permissionIds: Joi.array().required().items(
      Joi.string().required(),
    ),
  }),
});

exports.delete = Joi.object({
  params: Joi.object({
    clientId: Joi.string().required(),
    roleId: Joi.string().required(),
  }),
});

exports.getPermissions = Joi.object({
  params: Joi.object({
    clientId: Joi.string().required(),
    roleId: Joi.string().required(),
  }),
});
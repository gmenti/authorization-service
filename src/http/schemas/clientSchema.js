const Joi = require('joi');

exports.list = Joi.object({
  //
});

exports.get = Joi.object({
  params: Joi.object({
    clientId: Joi.string().required(),
  }),
});

exports.post = Joi.object({
  body: Joi.object({
    name: Joi.string().trim().required(),
    permissions: Joi.array().items(
      Joi.string().trim().uppercase().required()
    ).unique().required(),
  }),
});

exports.put = Joi.object({
  body: Joi.object({
    name: Joi.string().trim(),
  }),
});

const {
  CodedError,
  NotFoundError,
  ResourceNotFoundError,
  DuplicatedResourceError,
  AuthenticationError,
  ValidationError,
} = require('../../errors');

const logger = require('../../logger');

/**
 * @typedef ErrorConfig
 * @type {Object}
 * @property {typeof CodedError} class
 * @property {String} i18n
 */

/**
 * @type {ErrorConfig[]}
 */
const errorsConfigs = [
  { class: NotFoundError, i18n: 'error.notFound' },
  { class: ResourceNotFoundError, i18n: 'error.resourceNotFound' },
  { class: DuplicatedResourceError, i18n: 'error.duplicatedResource' },
  { class: AuthenticationError, i18n: 'error.authentication' },
  { class: ValidationError, i18n: 'error.validation' },
];

/**
 * @param {Error} error
 */
const getErrorConfig = error =>
  errorsConfigs.find(errorConfig => error instanceof errorConfig.class);

/**
 * @param {import('express').Request} req
 * @param {Error} error
 */
const loadErrorMessage = (req, error) => {
  const errorConfig = getErrorConfig(error);
  if (errorConfig) {
    const errorWithMessage = error;
    errorWithMessage.message = req.__(errorConfig.i18n);
  }
};

/**
 * @param {*} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const errorHandler = (err, req, res, next) => {
  if (err instanceof CodedError) {
    loadErrorMessage(req, err);
    logger.warn(err);
  } else {
    logger.error(err);
  }

  if (err instanceof ValidationError) {
    res.status(401).send(err);
    return next();
  }

  if (err instanceof NotFoundError || err instanceof ResourceNotFoundError) {
    res.status(404).send(err);
    return next();
  }

  if (err instanceof AuthenticationError) {
    res.status(401).send(err);
    return next();
  }

  if (err instanceof DuplicatedResourceError) {
    res.status(409).send(err);
    return next();
  }
  
  res.status(500).send({
    code: 'UNEXPECTED_ERROR',
    message: res.__('error.unexpected'),
  });

  return next();
};

module.exports = errorHandler;

const { authService } = require('../../container');

/**
 * @param {import('../index').HttpRequest} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @return {Promise<void>}
 */
const authMiddleware = async (req, res, next) => {
  return next();
  
  try {
    const accountId = await authService.getAccountIdFromToken({
      accessToken: req.header('Authorization'),
      balanceType: req.query.balanceType,
    });

    req.accessToken = req.header('Authorization');
    req.accountId = accountId;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authMiddleware;

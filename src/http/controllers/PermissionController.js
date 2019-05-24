class PermissionController {
  /**
   * @param {import('../../container').Container} container
   */
  constructor(container) {
    this.permissionService = container.permissionService;
  }

  /**
   * @param {import('../index').HttpRequest} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async list(req, res, next) {
    try {
      const clients = await this.permissionService.list(req.params.clientId);
      res.send(clients);
    } catch (err) {
      next(err);
    }
  }

  /**
   * @param {import('../index').HttpRequest} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async post(req, res, next) {
    try {
      const client = await this.permissionService
        .create({
          clientId: req.params.clientId,
          code: req.body.code,
        });

      res.send(client);
    } catch (err) {
      next(err);
    }
  }

  /**
   * @param {import('../index').HttpRequest} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async delete(req, res, next) {
    try {
      await this.permissionService
        .delete(req.params.permissionId);

      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PermissionController;

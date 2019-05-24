class RoleController {

  /**
   * @param {import('../../container').Container} container
   */
  constructor(container) {
    this.roleService = container.roleService;
  }

  /**
   * @param {import('../index').HttpRequest} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async list(req, res, next) {
    try {
      const roles = await this.roleService.list(req.params.clientId);
      res.send(roles);
    } catch (err) {
      next(err);
    }
  }

  /**
   * @param {import('../index').HttpRequest} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async get(req, res, next) {
    try {
      const role = await this.roleService.findById(req.params.roleId);
      res.send(role);
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
      const role = await this.roleService
        .create({
          clientId: req.params.clientId,
          title: req.body.title,
          description: req.body.description,
          permissionIds: req.body.permissionIds,
        });

      res.send(role);
    } catch (err) {
      next(err);
    }
  }

  /**
   * @param {import('../index').HttpRequest} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async put(req, res, next) {
    try {
      const role = await this.roleService
        .update(req.params.roleId, {
          title: req.body.title,
          description: req.body.description,
          permissions: req.body.permissions,
        });

      res.send(role);
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
      await this.roleService
        .delete(req.params.roleId);

      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  /**
   * @param {import('../index').HttpRequest} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getPermissions(req, res, next) {
    try {
      const permissions = await this.roleService.getPermissions(req.params.roleId);
      res.send(permissions);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RoleController;

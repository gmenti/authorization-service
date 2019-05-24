class ClientController {
  /**
   * @param {import('../../container').Container} container
   */
  constructor(container) {
    this.clientService = container.clientService;
  }

  /**
   * @param {import('../index').HttpRequest} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async list(req, res, next) {
    try {
      const clients = await this.clientService.list();
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
  async get(req, res, next) {
    try {
      const client = await this.clientService
        .findById(req.params.clientId);

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
  async post(req, res, next) {
    try {
      const client = await this.clientService
        .create(req.body);

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
  async put(req, res, next) {
    try {
      const client = await this.clientService
        .update(req.params.clientId, req.body);

      res.send(client);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ClientController;

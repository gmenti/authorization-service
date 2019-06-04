class AuthController {
    /**
     * @param {import('../../container').Container} container
     */
    constructor(container) {
        this.userService = container.userService;
    }

    /**
     * @param {import('../index').HttpRequest} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    me(req, res, next) {
        try {

        } catch (err) {
            next(err);
        }
    }
}
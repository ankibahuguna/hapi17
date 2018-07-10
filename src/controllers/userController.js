const autoBind = require("auto-bind");

class UserController {
  constructor(userService) {
    autoBind(this);
    this.service = userService;
  }

  async get({ query }, h) {
    try {
      const { skip, limit } = query;
      const users = await this.service.getAllUsers({}, {}, { skip, limit });
      return users;
    } catch (err) {
      return h.internalError(err);
    }
  }

  async getProfile({ auth }, h) {
    try {
      return {
        profile: await this.service.getUserById(auth.artifacts.id, { email: 1, name: 1, _id: 1 }),
      };
    } catch (err) {
      return h.internalError(err);
    }
  }
}


module.exports = UserController;


const Services = require("../services");

class UserController {
  constructor() {
    this.service = new Services.UserService();
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
        profile: await this.service.getUserById(auth.artifacts.id),
      };
    } catch (err) {
      return h.internalError(err);
    }
  }
}


module.exports = UserController;


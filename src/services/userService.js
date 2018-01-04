const Models = require("../models");
const DAO = require("../DAO");

class UserService {
  constructor() {
    this.model = new DAO(Models.Users);
  }

  async getUserById(id) {
    return this.model.findOne({ _id: id }, {}, {});
  }

  async getUserByEmail(email) {
    return this.model.findOne({ email });
  }

  getUser(condition, projection, options) {
    return this.model.findOne(condition, projection, options);
  }

  getAllUsers(condition) {
    return this.model.find(condition, {}, {});
  }

  registerUser(task) {
    return this.model.insert(task);
  }

  updateUser(condition, dataToupdate, options) {
    return this.model.update(condition, dataToupdate, options);
  }
}


module.exports = UserService;

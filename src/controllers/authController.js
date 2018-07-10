const JWT = require("jsonwebtoken");
const Boom = require("boom");
const Config = require("config");
const Bcrypt = require("bcrypt");
const autoBind = require("auto-bind");
const Redis = require("../redis");

const saltRounds = 10;

class AuthController {
  constructor(userService) {
    autoBind(this);
    this.service = userService;
  }

  async registerUser({ payload }, h) {
    try {
      payload.password = await Bcrypt.hash(payload.password, saltRounds);
      const user = await this.service.registerUser(payload);
      const response = {
        token: await AuthController.createToken(user._id),
      };
      return h.response(response).code(201);
    } catch (err) {
      return h.InternalError(err);
    }
  }

  async loginUser({ payload }, h) {
    try {
      const user = await this.service.getUser({ email: payload.email }, { }, {});
      if (!user) return Boom.forbidden("Email/password combination is incorrect");
      if (await Bcrypt.compare(payload.password, user.password) === false) {
        return Boom.forbidden("Email/password combination is incorrect");
      }
      const response = {
        token: await AuthController.createToken(user._id),
      };
      return h.response(response);
    } catch (err) {
      return h.InternalError(err);
    }
  }

  static async createToken(userid) {
    const accessToken = JWT.sign(
      { id: userid, type: "USER" },
      Config.get("SECRET_KEY"),
      { expiresIn: 3600 },
    );
    await Redis.set(userid, accessToken);
    return accessToken;
  }
}


module.exports = AuthController;


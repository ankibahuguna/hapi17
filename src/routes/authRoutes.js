const Joi = require("joi");
const { AuthController } = require("../controllers");
const Helpers = require("../helpers");
const Logger = require("../logger");

const Auth = new AuthController();
module.exports = [
  {
    path: "/users/register",
    method: "POST",
    options: {
      handler: Auth.registerUser.bind(Auth),
      description: "Register new user",
      tags: ["api", "auth"],
      auth: false,
      validate: {
        payload: {
          name: Joi.string().required(),
          password: Joi.string().required(),
          email: Joi.string().trim().required(),
        },
        failAction: Helpers.failAction,
      },
      response: {
        status: {
          201: Joi.object().keys({
            token: Joi.string().required(),
          }),
        },
        failAction: (...args) => Logger.debug(...args),
      },
    },
  },
  {
    path: "/users/login",
    method: "POST",
    options: {
      handler: Auth.loginUser.bind(Auth),
      description: "Login user",
      tags: ["api", "auth"],
      auth: false,
      validate: {
        payload: {
          password: Joi.string().required(),
          email: Joi.string().trim().required(),
        },
        failAction: Helpers.failAction,
      },
      response: {
        status: {
          200: Joi.object().keys({
            token: Joi.string().required(),
          }),
        },
        failAction: (...args) => Logger.debug(...args),
      },
    },
  },

];

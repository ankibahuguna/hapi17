const Joi = require("joi");
const Helpers = require("../helpers");
const Logger = require("../logger");
const Types = require("../types");
const Container = require("../container");

const Auth = Container.get(Types.AuthController);
module.exports = [
  {
    path: "/users/register",
    method: "POST",
    options: {
      handler: Auth.registerUser,
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
        failAction: (...args) => Logger.error(...args),
      },
    },
  },
  {
    path: "/users/login",
    method: "POST",
    options: {
      handler: Auth.loginUser,
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
        failAction: (...args) => Logger.error(...args),
      },
    },
  },

];

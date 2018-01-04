const Joi = require("joi");
const UserController = require("../controllers").Users;
const Helpers = require("../helpers");

const User = new UserController();
module.exports = [
  {
    path: "/users",
    method: "GET",

    options: {
      description: "Get all users",
      tags: ["api", "users"],
      auth: false,
      handler: User.get.bind(User),
    },
  },
  {
    path: "/users/profile",
    method: "GET",
    options: {
      handler: User.getProfile.bind(User),
      description: "Get user profile information",
      tags: ["api", "users"],
      validate: {
        headers: Joi.object({ authorization: Joi.string().optional() }).unknown(),
        failAction: Helpers.failAction,
      },
    },
  },
];

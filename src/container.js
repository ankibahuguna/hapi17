const inversify = require("inversify");
const TYPES = require("./types");
const { UserController, AuthController } = require("./controllers");
const { UserService } = require("./services");
require("reflect-metadata");
// Declare as injectable and its dependencies
inversify.decorate(inversify.injectable(), AuthController);
inversify.decorate(inversify.injectable(), UserController);
inversify.decorate(inversify.injectable(), UserService);

inversify.decorate(inversify.inject(TYPES.UserService), AuthController, 0);
inversify.decorate(inversify.inject(TYPES.UserService), UserController, 0);

// Declare bindings
const container = new inversify.Container();
container.bind(TYPES.UserController).to(UserController);
container.bind(TYPES.AuthController).to(AuthController);
container.bind(TYPES.UserService).to(UserService);

module.exports = container;

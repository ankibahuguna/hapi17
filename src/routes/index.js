const Users = require("./userRoute");
const Auth = require("./authRoutes");
const Health = require("./health");

const Routes = Users.concat(Auth, Health);

const Plugin = {
  name: "Routes",
  version: "1.0.0",
  register(server) {
    server.route(Routes);
  },
};
module.exports = Plugin;


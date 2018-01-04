const Users = require("./userRoute");
const Auth = require("./authRoutes");

const Routes = Users.concat(Auth);

const Plugin = {
  name: "Routes",
  version: "1.0.0",
  register(server) {
    server.route(Routes);
  },
};
module.exports = Plugin;


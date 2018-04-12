const Glue = require("glue");
const Config = require("config");
const Mongoose = require("mongoose");

const AuthJWT = require("./src/auth");

const Logger = require("./src/logger");


const manifest = require("./manifest");

Mongoose.Promise = Promise;

function InternalError(err) {
  Logger.fatal(err, "Internal server error.");

  return this.response({ statusCode: 500, message: "Something went wrong", error: err }).code(500);
}

const getServer = async () => {
  const Server = await Glue.compose(manifest, { relativeTo: __dirname });
  Logger.debug("Mongo URL ", Config.get("MONGO_URL"), process.env.MONGO_HOST);
  await Mongoose.connect(Config.get("MONGO_URL"));

  Server.auth.strategy("jwt-strategy", "hapi-now-auth", {
    verifyJWT: true,
    keychain: [Config.get("SECRET_KEY")],
    validate: AuthJWT.validateAuth,
  });
  Server.auth.default("jwt-strategy");
  Server.decorate("toolkit", "InternalError", InternalError);


  return Server;
};

// Log all uncaught errors in log file and terminal
process
  .on("unhandledRejection", (reason, p) => {
    Logger.fatal(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    Logger.fatal(err, "Uncaught Exception thrown");
  });

getServer()
  .then(Server => Server.start())
  .then((res) => {
    Logger.info(res);
  })
  .catch((err) => {
    Logger.error(err, "Could not start server.");
    process.exit(1);
  });
module.exports = getServer;

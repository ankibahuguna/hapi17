const Redis = require("ioredis");
const Config = require("config");

module.exports = new Redis(Config.get("REDIS_CONFIG"));

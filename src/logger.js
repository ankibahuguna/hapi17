const Bunyan = require("bunyan");
const Path = require("path");

require("fs-extra").ensureFileSync(Path.join(__dirname, "../", "logs/error.log"));
/*
  Only uncaught exceptions will be saved to the log file
 */
const outputStreams =
  [
    {
      level: "fatal",
      path: Path.join(__dirname, "../", "logs/error.log"), // log fatal and above to a file
    },
  ];

if (process.env.DEBUG) {
  outputStreams.push({ level: "debug", stream: process.stdout });
}

const Logger = Bunyan.createLogger({
  name: "Hapi17 API",
  streams: outputStreams,
  level: "error",
});

module.exports = Logger;

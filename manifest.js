const Pack = require("./package");

module.exports = {
  server: {
    port: process.env.PORT,
    routes: { cors: { origin: ["*"] } },
  },
  register: {
    plugins: [
      {
        plugin: "good",
        options: {
          ops: {
            interval: 1000,
          },
          reporters: {
            myConsoleReporter: [{
              module: "good-squeeze",
              name: "Squeeze",
              args: [{ log: "*", response: "*" }],
            }, {
              module: "good-console",
            }, "stdout"],
          },
        },
      },
      {
        plugin: "./src/routes",
      },
      {
        plugin: "inert",
      },
      {
        plugin: "vision",
      },
      {
        plugin: "@now-ims/hapi-now-auth",
      },
      {
        plugin: "hapi-swagger",
        options: {
          info: {
            title: "Test API Documentation",
            version: Pack.version,
          },
        },
      },
    ],
  },
};

exports.methods = [];

exports.methods.push({
  name: "npm.version",
  method: () => Utils.download("https://registry.npmjs.org/hapi/latest", { json: true, rejectUnauthorized: false }),
  options: {
    cache: {
      expiresIn: 60000,
      generateTimeout: 60000,
    },
    generateKey: () => "npm.version",
  },
});

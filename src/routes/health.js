module.exports = [
  {
    path: "/status",
    method: "GET",
    options: {
      description: "API health status",
      tags: ["api", "status"],
      auth: false,
      handler: () => "OK",
    },
  }];


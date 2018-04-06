const Logger = require("./logger");

function failAction(request, h, error) {
  Logger.error(error);
  return error;
}


module.exports = {
  failAction,
};

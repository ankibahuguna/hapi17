const Redis = require("./redis");

const validateAuth = async (request, token) => {
  let isValid;
  const artifacts = {};
  const credentials = token.decodedJWT;

  try {
    const accessToken = await Redis.get(credentials.id);

    if (token.token.toString() === accessToken.toString()) {
      isValid = true;
      artifacts.info = accessToken;
      artifacts.id = credentials.id;
      return { isValid, credentials, artifacts };
    }

    isValid = false;
    artifacts.info = accessToken;
    return { isValid, credentials, artifacts };
  } catch (err) {
    isValid = false;
    artifacts.error = err;
    return { isValid, credentials, artifacts };
  }
};


module.exports = {
  validateAuth,
};

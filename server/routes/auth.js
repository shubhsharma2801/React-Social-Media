const jwt = require("express-jwt");

const getTokenFromHeaders = (req) => {
  console.log("here");
  const {
    headers: { authorization },
  } = req;
  console.log("here ", authorization);
  if (authorization && authorization.split(" ")[0] === "Token") {
    return authorization.split(" ")[1];
  }
  return null;
};

const auth = {
  required: jwt({
    secret: "secret",
    userProperty: "payload",
    getToken: getTokenFromHeaders,
    credentialsRequired: true,
    algorithms: ["HS256"],
  }),
  optional: jwt({
    secret: "secret",
    userProperty: "payload",
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
    algorithms: ["HS256"],
  }),
};

module.exports = auth;

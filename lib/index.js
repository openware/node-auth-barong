/**
 * Expose `JWTAuthorizer`.
 */

const jwt = require("jsonwebtoken");

module.exports = {
  authorizer,
  verify
};

function verify(token, publicKey, options) {
  var result;
  try {
    result = jwt.verify(token, publicKey, options);
  } catch (error) {
    throw new Error(error);
  }
  return result;
}

function getAuthHeader(req) {
  var authHeader;
  try {
    authHeader = req.headers.authorization.split("Bearer ")[1];
  } catch (error) {
    throw new Error("No Authorization header present");
  }
  return authHeader;
}

function authorizer(options) {
  if (!options || !options.barongJwtPublicKey) {
    throw new Error("Barong JWT Pulic key should be set");
  }
  // TODO: Implemet request signing mechanism
  // if (!options.privateKey) throw new Error("Application's private key should be set")

  var barongJwtPublicKey = options.barongJwtPublicKey;
  //  var privateKey = options.privateKey
  var jwtAlgorithm = options.jwtAlgorithm || "RS256";
  //  var jwtExpireDate = options.jwtExpireDate || 60
  //  var jwtKid = options.jwtKid || "applogic"

  var middleware = function(req, res, next) {
    var authHeader;
    try {
      authHeader = getAuthHeader(req);
    } catch (error) {
      res.status(401);
      res.send(error);
    }

    try {
      verify(authHeader, barongJwtPublicKey, { algorithms: [jwtAlgorithm] });
    } catch (error) {
      res.status(403);
      res.send(`Signature verification raised: ${error}`);
    }

    next();
  };
  return middleware;
}

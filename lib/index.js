/**
 * Expose `JWTAuthorizer`.
 */

const jwt = require("jsonwebtoken");
var unless = require("express-unless");

module.exports = function(options) {
  if (!options || !options.barongJwtPublicKey) {
    throw new Error("Barong JWT Pulic key should be set");
  }
  // TODO: Implemet request signing mechanism
  // if (!options.privateKey) throw new Error("Application's private key should be set")

  var barongJwtPublicKey = options.barongJwtPublicKey;
  //  var privateKey = options.privateKey
  //  var jwtAlgorithm = options.jwtAlgorithm || "RS256";
  //  var jwtExpireDate = options.jwtExpireDate || 60
  //  var jwtKid = options.jwtKid || "applogic"

  var defaultOptions = {
    algorithms: ["RS256"],
    issuer: "barong"
  };

  var verificationOptions = { ...defaultOptions, ...options };

  var middleware = function(req, res, next) {
    var authHeader;

    try {
      authHeader = req.headers.authorization.split("Bearer ")[1];
    } catch (error) {
      res.status(401);
      res.send(
        "Signature verification raised: Authorization header is missing or malformed"
      );
    }

    try {
      req.session = jwt.verify(
        authHeader,
        barongJwtPublicKey,
        verificationOptions
      );
    } catch (error) {
      res.status(403);
      res.send(`Signature verification raised: ${error}`);
    }

    next();
  };

  middleware.unless = unless;
  return middleware;
};

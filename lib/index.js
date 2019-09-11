/**
 * Expose `JWTAuthorizer`.
 */

const jwt = require("jsonwebtoken");
var unless = require("express-unless");
var exports = (module.exports = {});

exports.sessionVerifier = function(options) {
  if (!options || !options.barongJwtPublicKey) {
    throw new Error("Barong JWT Pulic key should be set");
  }

  var barongJwtPublicKey = options.barongJwtPublicKey;

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

exports.managementSigner = function(options) {
  if (!options.privateKey)
    throw new Error("Application's private key should be set");
  var defaultOptions = {
    jwtAlgorithm: "RS256",
    jwtKid: "applogic",
    jwtExpireDate: 60
  };

  var signingOptions = { ...defaultOptions, ...options };

  var middleware = function(req, res, next) {
    if (!req.management.payload) console.error("No payload to be signed");
    var payload = req.management.payload;
    var signedPayload;

    try {
      signedPayload = signPayload(payload, signingOptions);
    } catch (error) {
      res.status(403);
      res.send(`Unable to sign payload: ${error}`);
    }

    try {
      req.body = formatParams(signedPayload, signingOptions);
    } catch (error) {
      res.status(403);
      res.send(`Unable to correctly format signed payload: ${error}`);
    }

    next();
  };
  middleware.unless = unless;
  return middleware;
};

function formatParams(payload, options) {
  var requestParams = {
    payload: payload.split(".")[1],
    signatures: [
      {
        protected: payload.split(".")[0],
        header: {
          kid: options.jwtKid
        },
        signature: payload.split(".")[2]
      }
    ]
  };
  return requestParams;
}

function signPayload(payload, options) {
  var token = jwt.sign(
    {
      data: payload,
      exp: Date.now() + options.jwtExpireDate
    },
    options.privateKey,
    {
      algorithm: options.jwtAlgorithm
    }
  );
  return token;
}

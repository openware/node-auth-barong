/**
 * Expose `JWTAuthorizer`.
 */

module.exports = barongJWTAuthorizer

function barongJWTAuthorizer (options) {
  if (!options || !options.barongJwtPublicKey) throw new Error("Barong JWT Pulic key should be set")
  if (!options.privateKey) throw new Error("Application's private key should be set")

  var barongJwtPublicKey = options.barongJwtPublicKey
  var privateKey = options.privateKey
  var jwtAlgorithm = options.jwtAlgorithm || "RS256"
  var jwtExpireDate = options.jwtExpireDate || 60
  var jwtKid = options.jwtKid || "applogic"

  var middleware = function (req, res, next) {
    next()
  }
}

/**
 * Expose `JWTAuthorizer`.
 */

module.exports = barongJWTAuthorizer;

function barongJWTAuthorizer(options) {
  return function(req, res, next) {
    next();
  };
}

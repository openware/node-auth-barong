/**
 * Dependencies.
 */

var barongJWTAuthorizer = require("../lib");
var assert = require("assert");
var mocha = require("mocha");
var expect = require("chai").expect;
var describe = mocha.describe;
var it = mocha.it;

/**
 * Tests.
 */

describe("authorizer()", function() {
  it("should be a function", function() {
    assert.strictEqual(typeof barongJWTAuthorizer.authorizer, "function");
  });

  it("should raise error when Barong JWT Public key is not set", function() {
    expect(() => barongJWTAuthorizer.authorizer({})).to.throw(
      "Barong JWT Pulic key should be set"
    );
  });
});

describe("verify()", function() {
  it("should raise an error if jwt is not properly formatted", function() {
    expect(() =>
      barongJWTAuthorizer.verify("jwt_wrong_format", "public_key_wrong_format")
    ).to.throw("JsonWebTokenError: jwt malformed");
  });
});

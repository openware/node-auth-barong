/**
 * Dependencies.
 */

var barongJWTAuthorizer = require("../lib/barongJWTAuthorizer");
var assert = require("assert");
var mocha = require("mocha");
var describe = mocha.describe;
var it = mocha.it;

/**
 * Tests.
 */

describe("barongJWTAuthorizer()", function() {
  it("should be a function", function() {
    assert.strictEqual(typeof barongJWTAuthorizer, "function");
  });
});

/**
 * Dependencies.
 */

var assert = require("assert");
var mocha = require("mocha");
var describe = mocha.describe;
var it = mocha.it;
var barongJWTAuthorizer = require("../lib");
var httpMocks = require("node-mocks-http");

/**
 * Tests.
 */
describe("Middleware test", function() {
  var request = httpMocks.createRequest({
    method: "GET",
    url: "/test/path?myid=312"
  });
  var response = httpMocks.createResponse();

  it("should throw if barongJwtPublicKey is not sent", function() {
    try {
      barongJWTAuthorizer(request, response);
    } catch (e) {
      assert.ok(e);
      assert.strictEqual(e.message, "Barong JWT Pulic key should be set");
    }
  });
});

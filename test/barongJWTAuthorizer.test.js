/**
 * Dependencies.
 */

var barongJWTAuthorizer = require("../lib/barongJWTAuthorizer")
var assert = require("assert")
var mocha = require("mocha")
var expect = require("chai").expect
var describe = mocha.describe
var it = mocha.it

/**
 * Tests.
 */

describe("barongJWTAuthorizer()", function () {
  it("should be a function", function () {
    assert.strictEqual(typeof barongJWTAuthorizer, "function")
  })

  it("should raise error when Barong JWT Public key is not set", function () {
    expect(() => barongJWTAuthorizer({})).to.throw("Barong JWT Pulic key should be set")
  })

  it("should raise error when barong public", function () {
    expect(() => barongJWTAuthorizer({ barongJwtPublicKey: "pub_key" })).to.throw("Application's private key should be set")
  })
})

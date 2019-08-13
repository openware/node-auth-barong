# node-auth-barong

Middleware that validates JsonWebTokens returned from barong and sets `req.session`.

This module lets you validate JWT from HTTP requests using `jsonwebtoken` library in your Node.js
applications. JWTs are typically used to protect API endpoints.

## Install

    $ npm install node-auth-barong

## Usage

The JWT authentication middleware authenticates Barong session using a JWT.
If the token is valid, `req.session` will be set with the JSON object decoded
to be used by later middleware for authorization and access control.

Example of `req.session` object:

```
{ iat: 1565687278,
  exp: 1565693278,
  sub: 'session',
  iss: 'barong',
  aud: [ 'peatio', 'barong' ],
  jti: '1111111111',
  uid: 'ID123123123',
  email: 'admin@barong.io',
  role: 'admin',
  level: 3,
  state: 'active',
  referral_id: null }
```

For example,

```javascript
var barongJwt = require('node-auth-barong');
const barongJwtPublicKey = Buffer.from(process.env.BARONG_JWT_PUBLIC_KEY.trim(), 'base64').toString('utf-8')

app.get('/protected',
  barongJwt({barongJwtPublicKey: barongJwtPublicKey}),
  function(req, res) {
    if (!req.user.admin) return res.sendStatus(401);
    res.sendStatus(200);
  });
```

You can specify audience and/or issuer as well:

```javascript
barongJwt({ barongJwtPublicKey: 'decoded public key',
  audience: 'barong',
  issuer: 'http://issuer' })
```

Available options for verification:

  * algorithms: List of strings with the names of the allowed algorithms. For instance, ["HS256", "HS384"].
  * audience: if you want to check audience (aud), provide a value here. The audience can be checked against a string, a regular expression or a list of strings and/or regular expressions. Eg: "urn:foo", /urn:f[o]{2}/, [/urn:f[o]{2}/, "urn:bar"]
  * issuer (optional): string or array of strings of valid values for the iss field.
  * ignoreExpiration: if true do not validate the expiration of the token.
  * subject: if you want to check subject (sub), provide a value here
  * clockTolerance: number of seconds to tolerate when checking the nbf and exp claims, to deal with small clock differences among different servers
  * maxAge: the maximum allowed age for tokens to still be valid. It is expressed in seconds or a string describing a time span zeit/ms. Eg: 1000, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default ("120" is equal to "120ms").
  * clockTimestamp: the time in seconds that should be used as the current time for all necessary comparisons.

> If the JWT has an expiration (`exp`), it will be checked.

If you are using a base64 URL-encoded secret, pass a `Buffer` with `base64` encoding as the secret instead of a string:

```javascript
barongJwt({ barongJwtPublicKey: new Buffer('base64encoded', 'base64') })
```

Instead of decoding you can also specify the path to public key:

```javascript
var publicKey = fs.readFileSync('/path/to/public.pub');
barongJwt({ barongJwtPublicKey: publicKey });
```

## Related Modules

- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) — JSON Web Token sign and verification

## Tests

    $ npm install
    $ npm test

## Contributors
Check them out [here](https://github.com/auth0/express-jwt/graphs/contributors)

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker.

## Author

[Openware](https://www.openware.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.

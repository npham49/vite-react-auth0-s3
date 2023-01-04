const {expressjwt: expressJwt} = require('express-jwt');
import * as dotenv from "dotenv";
import jwksRsa from 'jwks-rsa';


dotenv.config();
// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
export const checkJwt = expressJwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.URI || ''
  }),

  // Validate the audience and the issuer
  audience: process.env.AUDIENCE || '', //replace with your API's audience, available at Dashboard > APIs
  issuer: process.env.ISSUER || '', //replace with your API's issuer, available at Dashboard > APIs
  algorithms: [ 'RS256' ]
});
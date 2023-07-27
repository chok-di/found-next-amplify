import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';


const cognitoPoolId = 'us-east-2_AzOEoMGUl'; //   replace with your Cognito Pool ID
const jwksUrl = `https://cognito-idp.us-east-2.amazonaws.com/${cognitoPoolId}/.well-known/jwks.json`;
const client = jwksClient({ jwksUri: jwksUrl });


export default function handler(req, res) {

  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const header = jwt.decode(token, { complete: true }).header;

    client.getSigningKey(header.kid, (err, key) => {
      if (err) {
        console.log('Error getting signing key: ', err);
        res.status(500).json({ error: 'Error getting signing key' });
        return;
      }
      const signingKey = key.publicKey || key.rsaPublicKey;

      jwt.verify(token, signingKey, { algorithms: ['RS256'] }, (err, decoded) => {
        if (err) {
          console.log('Error verifying token: ', err);
          res.status(401).json({ error: 'Invalid token' });
          return;
        }
        console.log({decoded});
        res.status(200).json({decoded});
      });
    });
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
}

import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';


const cognitoPoolId = 'us-east-2_AzOEoMGUl'; //   replace with your Cognito Pool ID
const jwksUrl = `https://cognito-idp.us-east-2.amazonaws.com/${cognitoPoolId}/.well-known/jwks.json`;
const client = jwksClient({ jwksUri: jwksUrl });


export default function handler(req, res) {
  // console.log(req.headers);
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // console.log('yes');
    const token = authHeader.split(' ')[1];
    const header = jwt.decode(token, { complete: true }).header;
    // console.log({header});
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



  // const {method} = req;

  // switch (method) {
  //   case 'GET':
  //     // Handle GET request
  //     const token = req.headers.authorization ?
  //     req.headers.authorization.split(' ')[1];

  //     res.status(200).json({ user: 'John Doe' });
  //     break;
  //   case 'POST':
  //     // Handle POST request
  //     // Extract JSON data from the request body
  //     console.log(req);
  //     const { name } = req.body;
  //     res.status(200).json({ message: `Hello, ${name}!` });
  //     break;
  //   default:
  //     // Handle other HTTP methods
  //     res.setHeader('Allow', ['GET', 'POST']);
  //     res.status(405).end(`Method ${method} Not Allowed`);
  // }




// app.get('/api/user', (req, res) => {
//   const token = req.headers.authorization.split(' ')[1]; // Get the token from the Authorization header

  // Use the token to authenticate the user and retrieve their email
  // This depends on how your authentication system is implemented
  // For demonstration, let's assume you have a function called 'authenticateAndGetEmail'

  // authenticateAndGetEmail(token)
  //   .then(email => res.json({ email }))
  //   .catch(error => {
  //     console.error(error);
  //     res.status(500).json({ error: 'Failed to authenticate user' });
  //   });
// });
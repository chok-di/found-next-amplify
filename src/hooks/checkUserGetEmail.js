import jwt from "jsonwebtoken";
import jwksClient from 'jwks-rsa';
import Cookies from 'js-cookie';



export function saveToken(token) {
  Cookies.set('userToken',token);
  // console.log("token saved");
  console.log({token});
}

export async function getToken(token) {
  // console.log("node env is:")
  // console.log(process.env.NODE_ENV);
  const response = await fetch('http://localhost:3000/api/user', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.error('Error:', response.status);
  }
}


// export async function verifyToken(token) {


//   const header = jwt.decode(token, { complete: true }).header;


//   client.getSigningKey(header, kid, (err, key) => {
//     if (err) {
//       console.log('Error getting signing key: ', err);
//       return;
//     }
//     const signingKey = key.publicKey || key.rsaPublicKey;
//     jwt.verify(token, signingKey, { algorithms: ['RS256'] }, (err, decoded) => {
//       if (err) {
//         console.log('Error verifying token: ', err);
//         return;
//       }
//       console.log('Decoded JWT: ', decoded);

//     });
//   })
// }

// async function fetchUserData() {
//   // Get the token from local storage.
//   const token = localStorage.getItem('userToken');

//   // Check if the token exists
//   if (!token) {
//     throw new Error('No token found');
//   }

//   const response = await fetch('/api/user', {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   const data = await response.json();

//   return data;
// }


// export async function fetchUserData(token) {
//   const response = await fetch('/api/user', {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   const data = await response.json();

//   return data;
// }
  

//   const response = await fetch('/api/user', {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   const data = await response.json();
//   //console.log(data); //This will log the response data where the email should be included.

//   return data.email; // Assumes the server responds with a JSON object that includes an email property.
// }




// app.get('/api/user', (req, res) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).json({ error: 'No authorization header' });
//   }

//   const token = authHeader.split(' ')[1];

//   // Verify the token using the jwt.verify method
//   // This will throw an error if the token is not valid or has expired
//   try {
//     const decoded = jwt.verify(token, 'your-secret-key');
//     // If the token is valid, decoded will be the decoded payload of the token
//     // This usually includes the user ID and any other data you included when you signed the token

//     // Now you can retrieve the user's email based on the decoded data
//     // For demonstration, let's assume you have a function called 'getEmailFromUserId'
//     getEmailFromUserId(decoded.userId)
//       .then(email => res.json({ email }))
//       .catch(error => {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to get user email' });
//       });

//   } catch (error) {
//     console.error(error);
//     // If the token is not valid or has expired, return a 401 Unauthorized status
//     res.status(401).json({ error: 'Invalid or expired token' });
//   }
// });

// import jwt from "jsonwebtoken";
// import jwksClient from 'jwks-rsa';
import Cookies from 'js-cookie';



export function saveToken(token) {
  Cookies.set('userToken',token);
  // console.log("token saved");
  console.log({token});
}

export async function getUser(token) {
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
    const user = data.decoded;
    return user;
  } else {
    console.error('Error:', response.status);
  }
}

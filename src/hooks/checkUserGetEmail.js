// import jwt from "jsonwebtoken";
// import jwksClient from 'jwks-rsa';
import Cookies from 'js-cookie';
import {Auth} from 'aws-amplify';


export function saveToken(token) {
  Cookies.set('userToken',token);
  console.log("token saved");
  console.log({token});
  console.log("immediately get token");
  console.log(Cookies.get('userToken'));
}


export async function getUser(token) {
  // const token = Cookies.get("userToken");
  console.log("token  from hook is");
  console.log(token);
  
  const response = await fetch('http://localhost:3000/api/user', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    const user = data.decoded;
    console.log("returning user");
    console.log({user});
    return user;
  } else {
    console.error('Error:', response.status);
  }
}

export function signOut(){
  Cookies.remove('userToken');
  Auth.signOut();
}


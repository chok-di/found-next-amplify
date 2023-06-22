"use client"

import React, {useState} from "react";
import {Amplify,Auth} from 'aws-amplify'
import awsmobile from '../../aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Home from "../page.tsx"



Amplify.configure( awsmobile
  // Auth:{
  //   region:awsmobile.aws_project_region,
  //   userPoolId: awsmobile.aws_user_pools_id,
  //   userPoolWebClientId: awsmobile.aws_user_pools_web_client_id, 
  // },
  // oauth: {
  //   redirectSignIn:awsmobile.oauth.redirectSignIn,
  //   redirectSignOut:`/`
  // }
);


// async function signUp() {
//   try {
//     const { user } = await Auth.signUp({
//       username,
//       password,
//       attributes: {
//         email,          // optional
//         phone_number,   // optional - E.164 number convention
//         // other custom attributes 
//       },
//       autoSignIn: { // optional - enables auto sign in after user is confirmed
//         enabled: true,
//       }
//     });
//     console.log(user);
//   } catch (error) {
//     console.log('error signing up:', error);
//   }
// }



function AuthPage({signOut,user}) {
  
  
  return (
    <>
      <Home
      loggedIn={true}
      user={user}
      signOut={signOut}/>
      {/* <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button> */}
    </>
      // <Authenticator>
      //     {({ signOut, user }) => (
      //         <div>
      //             <button onClick={signOut}>Sign out</button>
      //         </div>
      //     )}
      // </Authenticator>
  );
}

export default withAuthenticator(AuthPage);


// export const Login = (props) => {
//   // const [show, setShow] = useState(false);

//   // const handleClose = () => setShow(false);
//   // const handleShow = () => setShow(true);
//   // const [user,setUser] = useState("");
//   const [loginState,setLoginState] = useState({email: "", password: ""});


//   const logInHandler = async (e) => {
//     e.preventDefault();

//     // Example usage:
//     // After a successful login
//     try {
//       const response = await axios.post("users/login", {
//         email: loginState.email,
//         password: loginState.password
//       });

//       props.setCookie("user",response.data.user,{path:"/"});
//       props.setShow(false);
//       return;
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   return (
//     <>
//           <Form onSubmit={signUp}>
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control 
//                 type="email" 
//                 placeholder="Enter email" 
//                 value={loginState.email}
//                 onChange={(e) => {setLoginState(prev => {return {...prev, email: e.target.value}})}}
//               />
//               {/* <Form.Text className="text-muted">
//               </Form.Text> */}
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control 
//                 type="password"
//                 placeholder="Password"
//                 value={loginState.password}
//                 onChange={(e) => {setLoginState(prev => {return {...prev, password: e.target.value}})}} 
//               />
//             </Form.Group>
//             <Button 
//               variant="primary" 
//               type="submit"
//             >
//               Log In
//             </Button>
//           </Form>

//     </>
//   );
// }

// export default Login;


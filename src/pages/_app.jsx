import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
// import {cookies} from 'next/headers';
import {useRouter} from 'next/router';
import {Amplify,Auth} from 'aws-amplify';
import awsmobile from '../aws-exports.js';
import Layout from '../app/components/Layout';
import UserChecker from '../app/components/User.server.jsx';
import useFetchUser from '../hooks/useFetchUser';
import Nav from '../app/components/Nav';
import Footer from '../app/components/Footer';

// import {getUser} from "../hooks/checkUserGetEmail.js";

Amplify.configure({...awsmobile, ssr:true});


export default function MyApp({Component,pageProps}){
    // const user = getUser();
  // console.log({pageProps});
  // const router = useRouter(); 
  // const [user, setUser] = useState(null);
  // const logOut = () => {
  //   Auth.signOut()
  //   .then(setUser(null))
  //   .catch(err => console.log(err));
  // }

  // useEffect(() => {
  //   Auth.currentAuthenticatedUser()
  //     .then(authData => {
  //      setUser(authData);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       // handle situation when user is not authenticated or any other auth error
  //     });
  // }, [router.asPath]);
  // const navWithUserChecker = 

  return(
      <Layout>
        <Nav/>
        <Component {...pageProps}/>
        <Footer/>
      </Layout>
  )
}


// MyApp.getInitialProps = async ({Component,ctx}) => {
//   // const token = Cookies.get("userToken")
//   // console.log("token is");
//   // console.log(token);

//   let user = await getUser();
//   // console.log("found user. user is");
//   // console.log({user});
//   let email = null;
//   if (user) email = user.email;
//   console.log("found user,email is");
//   console.log(email);
//   ctx.query.email = email;
//   let pageProps = {};
//   if (Component.getInitialProps){
//     pageProps = await Component.getInitialProps(ctx);
//   }
  
//   return {...pageProps, email}
// }
import React, { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import {Amplify,Auth} from 'aws-amplify';
import awsmobile from '../aws-exports.js';
import Layout from '../app/components/Layout';
import Nav from '../app/components/Nav';
import Footer from '../app/components/Footer';

import {getToken} from "../hooks/checkUserGetEmail.js";

Amplify.configure({...awsmobile, ssr:true});

export default function MyApp({Component,pageProps,user}){

  const router = useRouter(); 
  // const [user, setUser] = useState(null);
  const logOut = () => {
    Auth.signOut()
    .then(setUser(null))
    .catch(err => console.log(err));
  }

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(authData => {
       setUser(authData);
      })
      .catch(err => {
        console.log(err);
        // handle situation when user is not authenticated or any other auth error
      });
  }, [router.asPath]);

  return(
    <Layout>
      <Nav user={user} logOut={logOut}/>
      <Component {...pageProps} user={user} setUser={setUser}/>
      <Footer/>
    </Layout>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  let email = null;
  const token = appContext.req.cookies.userToken;
  if (token)  user = await getToken(token);
  if (user) email = user.decoded.email
  return {...appProps, email}
}
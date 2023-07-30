import React, { useEffect, useState } from 'react';
import cookies from 'js-cookie';
import {useRouter} from 'next/router';
import {Amplify,Auth} from 'aws-amplify';
import awsmobile from '../aws-exports.js';
import Layout from '../app/components/Layout';
import Nav from '../app/components/Nav';
import Footer from '../app/components/Footer';

import {getUser} from "../hooks/checkUserGetEmail.js";

Amplify.configure({...awsmobile, ssr:true});

export default function MyApp({Component,pageProps,email}){

  const router = useRouter(); 
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

  return(
    <Layout>
      <Nav user={email} />
      <Component {...pageProps} user={email} />
      <Footer/>
    </Layout>
  )
}

MyApp.getInitialProps = async ({Component,ctx}) => {

  let pageProps = {};
  if (Component.getInitialProps){
    const componentProps = await Component.getInitialProps(ctx);
    pageProps = {...componentProps};
  }
  const token = cookies.get("userToken")
  let user = await getUser(token);
  let email = null;
  if (user) email = user.email;
  return {...pageProps, email}
}
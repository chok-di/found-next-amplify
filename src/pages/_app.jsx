import React, { useEffect, useState } from 'react';
import {Amplify,Auth} from 'aws-amplify';
import awsmobile from '../aws-exports.js';
import Layout from '../app/components/Layout';
import Nav from '../app/components/Nav';
import Footer from '../app/components/Footer';

Amplify.configure(awsmobile);

export default function MyApp({Component,pageProps}){
  const [user, setUser] = useState(null);
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(authData => {
        console.log(authData);
        setUser(authData);
      })
      .catch(err => {
        console.log(err);
        // handle situation when user is not authenticated or any other auth error
      });
  }, []);

  return(
    <Layout>
      <Nav user={user}/>
      <Component {...pageProps} user={user}/>
      <Footer/>
    </Layout>
  )
}
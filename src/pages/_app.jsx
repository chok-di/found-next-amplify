import React, { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import {Amplify,Auth} from 'aws-amplify';
import awsmobile from '../aws-exports.js';
import Layout from '../app/components/Layout';
import Nav from '../app/components/Nav';
import Footer from '../app/components/Footer';

Amplify.configure(awsmobile);

export default function MyApp({Component,pageProps}){
  const router = useRouter(); 
  const [user, setUser] = useState(null);
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
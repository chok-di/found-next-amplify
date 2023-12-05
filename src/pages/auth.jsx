"use client"

import { useEffect } from "react";
import { useRouter } from 'next/router';
import { Amplify, Auth, Hub } from 'aws-amplify'
import awsmobile from '../aws-exports';
import { Authenticator, SignUpContext } from '@aws-amplify/ui-react';

// import { Authenticator, CheckboxField, AmplifySignUp,AmplifySignOut } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


import { saveToken } from "../hooks/checkUserGetEmail.js";

import Layout from "../app/components/Layout";


Amplify.configure(awsmobile);

function AuthPage() {
  const router = useRouter();
  // redirect to the page before 
  const handleLogIn = async () => {
    const previousPath = localStorage.getItem('previousPath') || '/';
    localStorage.removeItem('previousPath');
    await router.push(previousPath);
    router.reload();
  };

  useEffect(() => {
    if (document.referrer) {
      const previousPath = new URL(document.referrer).pathname;
      localStorage.setItem('previousPath', previousPath);
    }

    const getUserAndSendToken = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        saveToken(token);
      } catch (err) {
        console.log('Error during fetching user', error);
      }
    }

    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        //sign out from user side when token expires
        case 'tokenRefresh_failure':
          Auth.signOut();
          break;
        case 'signIn':
        case 'cognitoHostedUI':
          console.log("hello");
          getUserAndSendToken();
          handleLogIn();
          break;
        case 'signOut':
          router.push('/');
          break;
      }
    });

  }, []
  );

  return (
    <Layout>
      <Authenticator>
        <button onClick={() => Auth.signOut()}>Sign out</button>
      </Authenticator>
    </Layout>

  );
}


export default AuthPage;
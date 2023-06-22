"use client"

import {useEffect} from "react";
import {Amplify,Auth} from 'aws-amplify'
import awsmobile from '../../aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/navigation';
 


Amplify.configure( awsmobile);

function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log('user: ', user);
      router.push('/');
    } catch (err) {
      console.log('error: ', err);
    }
  }

  return (
    <Authenticator>
          {({ signOut, user }) => (
           <button onClick={signOut}>Sign out</button>
          )}
 
    </Authenticator>
  )
}

export default AuthPage;
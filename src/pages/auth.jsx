"use client"

import {useEffect} from "react";
import {Amplify,Auth,Hub} from 'aws-amplify'
import awsmobile from '../aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/navigation';
 




Amplify.configure( awsmobile);

function AuthPage() {
  const router = useRouter();

  async function sendTokenToServer(token) {
    const response = await fetch('/api/user',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({message: 'Hello from client!'})
    });
    const data = await response.json();
    console.log(data);
  }

  useEffect(() => {

    const getUserAndSendToken = async () => {
      try{
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        await sendTokenToServer(token);

      } catch (err) {
        console.log('Error during fetching user', error);
      }
    }


    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUserAndSendToken();
          router.push('/');
          break;
        case 'signOut':
          router.push('/');
          break;
      }
    });
    
  }, []);

  return (
    <Authenticator>
      <button onClick={() => Auth.signOut()}>Sign out</button>
    </Authenticator>
  );
}


export default AuthPage;
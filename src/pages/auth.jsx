import {useEffect} from "react";
import {Amplify,Auth,Hub} from 'aws-amplify'
import awsmobile from '../aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/navigation';
 


Amplify.configure( awsmobile);

function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          console.log("jump");
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
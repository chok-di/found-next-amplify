"use client"

import 'bootstrap/dist/css/bootstrap.css';

import Link from 'next/link';
// import Date from '../components/date';
import Head from 'next/head';
import RootLayout from './layout';
import utilStyles from '../styles/utils.module.css';
import homeStyles from '../styles/home.module.css';
// import { getSortedPostsData } from '../lib/posts';
import { GetStaticProps } from 'next';

import Nav from "../components/Nav";
import Gallery from "../components/Gallery";
import Scheduler from "../components/Scheduler";
import Footer from "../components/Footer";




import {Amplify} from 'aws-amplify'
import awsmobile from '../aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';



Amplify.configure({
  Auth:{
    region:awsmobile.aws_project_region,
    userPoolId: awsmobile.aws_user_pools_id,
    userPoolWebClientId: awsmobile.aws_user_pools_web_client_id
  }
});

function App() {
  return (
      <Authenticator>
          {({ signOut, user }) => (
              <div>
                  <button onClick={signOut}>Sign out</button>
              </div>
          )}
      </Authenticator>
  );
}

export default App;
// Auth.configure(awsconfig);

// function App() {
//   const { signOut } = useAuthenticator()
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <button onClick={() => signOut()}>Log Out</button>
//       </header>
//     </div>
//   );
// }

// export default withAuthenticator(App);

// export default function Home() {
//   return (
//     <RootLayout>
//       <Nav />
//       <div className = {`${homeStyles.top_page}`}>
//         <span><h1>Let's Thrive Together.</h1></span>
//         <div><button>Book Now</button></div>
//       </div>

//       <div className={`${homeStyles.mission} row`}>
//         <div className={`${homeStyles.card} col-md-4`}>
//           <h3>UNPLUG</h3>
//           <div>Unplug and enjoy time away from digital distractions, and focus more on the present.</div>
//         </div>
//         <div className={`${homeStyles.card} col-md-4`}>
//           <h3>CONNECT</h3>
//           <div>Reconnext with ourselves, the ocean, nature and other like-minded individuals.</div>
//         </div>
//         <div className={`${homeStyles.card} col-md-4`}>
//           <h3>RECHARGE</h3>
//           <div>Recharge through daily yoga, water sports and activities,coaching sessions,seasonal menus, and comfortable accommodation.</div>
//         </div>
//       </div>

//       <div className="Gallery">
//         <h3>Photo Gallery</h3>
//         <Gallery/>
//       </div>

//       <div className="Calendar">
//         <h3>Calendar</h3>
//         <Scheduler/>
//       </div>
//       <Footer/>
//     </RootLayout>
//   );
// }


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


export default function Home() {
  return (
    <RootLayout>
      <Nav />
      <div className = {`${homeStyles.top_page}`}>
        <span><h1>Let's Thrive Together.</h1></span>
        <div><button>Book Now</button></div>
      </div>

      <div className={`${homeStyles.mission} row`}>
        <div className={`${homeStyles.card} col-md-4`}>
          <h3>UNPLUG</h3>
          <div>Unplug and enjoy time away from digital distractions, and focus more on the present.</div>
        </div>
        <div className={`${homeStyles.card} col-md-4`}>
          <h3>CONNECT</h3>
          <div>Reconnext with ourselves, the ocean, nature and other like-minded individuals.</div>
        </div>
        <div className={`${homeStyles.card} col-md-4`}>
          <h3>RECHARGE</h3>
          <div>Recharge through daily yoga, water sports and activities,coaching sessions,seasonal menus, and comfortable accommodation.</div>
        </div>
      </div>

      <div className="Gallery">
        <h3>Photo Gallery</h3>
        {/* <Gallery/> */}
      </div>

      <div className="Calendar">
        <h3>Calendar</h3>
        {/* <Scheduler/> */}
      </div>
    </RootLayout>
  );
}


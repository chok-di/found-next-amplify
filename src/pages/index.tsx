//import .env for local development
import 'dotenv/config'; 

// import 'bootstrap/dist/css/bootstrap.css';

import Link from 'next/link';
// import Date from '../components/date';
import Head from 'next/head';
import RootLayout from '../app/components/Layout';
import utilStyles from '../styles/utils.module.css';
import homeStyles from '../app/styles/home.module.css';

// import { getSortedPostsData } from '../lib/posts';
import { GetStaticProps } from 'next';

import Nav from "../app/components/Nav";
import Gallery from "../app/components/Gallery";
import Scheduler from "../app/components/Scheduler";
import Footer from "../app/components/Footer";


export default function Home() {
  return (
    <div className="m-0 p-0">
      {/* <div className = {`${homeStyles.top_page}`}> */}
      <div className=" m-0 bg-[url('../img/background.jpg')]" >
        <div><h1 className="ml-24 mt-48 text-7xl font-serif text-white ">Let's Thrive Together.</h1></div>
        <button className="ml-24 mt-24 mb-24 text-white">Book Now</button>
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
        <Gallery/>
      </div>

      <div className="Calendar">
        <h3>Calendar</h3>
        <Scheduler/>
      </div>
    </div>
  );
}

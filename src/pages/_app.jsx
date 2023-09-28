
import {Amplify,Auth} from 'aws-amplify';
import awsmobile from '../aws-exports.js';

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;


import Layout from '../app/components/Layout';
import Nav from '../app/components/Nav';
import Footer from '../app/components/Footer';
import "../app/globals.css";

import "../app/styles/Scheduler.module.css";



Amplify.configure({...awsmobile, ssr:true});


export default function MyApp({Component,pageProps}){
  return(
        <Component {...pageProps}/>
  )
}


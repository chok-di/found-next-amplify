
import {Amplify} from 'aws-amplify';
import awsmobile from '../aws-exports.js';

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;



import "../app/globals.css";
import "../app/styles/scheduler.module.css";



Amplify.configure({...awsmobile, ssr:true});


export default function MyApp({Component,pageProps}){
  return(
        <Component {...pageProps}/>
  )
}


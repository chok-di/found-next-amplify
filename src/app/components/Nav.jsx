
import React,{useState,useEffect} from "react";

import {getUser} from "../../hooks/checkUserGetEmail";
import Link from "next/link";
import Cookies from 'js-cookie';

// import 'bootstrap/dist/css/bootstrap.css';
import nav_classes from '../styles/nav.module.css';



export default function Nav(){
  const [email,setEmail] = useState(null);
  

  useEffect(async()=>{
    const token = Cookies.get("userToken");
    const user = await getUser(token);
    setEmail(user.email);
  }
  ,[]);


  return (
    // <div className={nav_classes.nav_background}>
    <nav className="flex flex-row bg-[url('../img/background.jpg')] text-white" >
      {/* left */}
      <div className="basis-1/4 text-[2em] font-serif">FOUND.</div>
      {/* right */}
      {/* <div className="basis-3/4  grid grid-cols-12 gap-5">
        <div className="col-start-10"> 111</div>
        <div className="col-start-11"> 1222</div>
        <div className="col-start-12"> 1333</div>
      </div> */}
      <div className=" basis-3/4 flex flex-row justify-end">
        <div className=""> 111</div>
        <div className=""> 1222</div>
        <div className=""> 1333</div>
      </div>
      {/* <a className= "text-green-600" href="#">FOUND.</a>
      <div className={`collapse navbar-collapse justify-content-end `} id="navbarSupportedContent">
        <ul className={`navbar-nav mr-auro ${nav_classes.nav_contents}`}>
          <li className="nav-item">
            <a className={`nav-link ${nav_classes.nav_item}`} href="#">About</a>
          </li>
          <li class="nav-item">
            <a class={`nav-link ${nav_classes.nav_item}`} href="#">Corporate Retreats</a>
          </li>
          <li class="nav-item">
            <a class={`nav-link ${nav_classes.nav_item}`} href="#">Gallery</a>
          </li>
          {email && (
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {email}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="/trips">Book</a>
                <a class="dropdown-item" href="#">My Bookings</a>
                <a class="dropdown-item" href="#">Past Bookings</a>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" type="button" >Log Out</button>
              </div>
          </li>
          )}
          {!email && (
            <li class="nav-item">
            <button class={`nav-link ${nav_classes.nav_item} ${nav_classes.nav_button}`}><Link href="/auth">Log In</Link></button>
            </li>
          )}
        </ul>
      </div>   */}
    </nav>
  // </div>

 );

};


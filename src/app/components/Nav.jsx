"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getUser,signOut } from "../../hooks/checkUserGetEmail";
import Link from "next/link";
import Cookies from 'js-cookie';



export default function Nav() {
  const [email, setEmail] = useState(null);
<<<<<<< HEAD
=======
  const router = useRouter(); 
>>>>>>> tailwind

  useEffect(async () => {
    const token = Cookies.get("userToken");
    const user = await getUser(token);
    if (user) { setEmail(user.email); }
  }
    , []);


  return (
    // <div className={nav_classes.nav_background}>
    <nav className="m-0 p-0 flex flex-row bg-[url('../img/background.jpg')] text-white" >
      {/* left */}
      <div className=" mt-16 ml-24 basis-1/4 text-[2em] font-serif">FOUND.</div>
      {/* right */}

      <div className=" basis-3/4 text-[1.3em] font-mono flex flex-row justify-end">
        <div className="mt-16 mr-8 "> About </div>
        <div className="mt-16 mr-8"> Corporate Retreats</div>
        <div className="mt-16 mr-8"> 中文 </div>
        <div className="mt-14 mr-8">
          {!email && <button className="border-2 w-24 h-12"> <Link href="/auth">Log In </Link> </button>}
          {email && (
            <div className="dropdown relative inline-block">
              <button className="dropbtn w-24 h-12"> Name </button>
              <div className="dropdown-content">
                <div><Link href="/trips">Trips</Link></div>
                <div>My Bookings</div>
                <div><button onClick={()=>{signOut();router.reload()} }>Log Out</button></div>
              </div>
            </div>


          )}
        </div>
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

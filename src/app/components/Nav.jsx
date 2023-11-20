"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getUser,signOut } from "../../hooks/checkUserGetEmail";
import Link from "next/link";
import Cookies from 'js-cookie';



export default function Nav({home}) {
  const [user, setUser] = useState(null);
  const router = useRouter(); 

  useEffect(async () => {
    const token = Cookies.get("userToken");
    const user = await getUser(token);
    if (user) { setUser(user); }

    const handleScroll = () => {
        var navbar = document.getElementById('navbar');
        if (window.scrollY>0){
          navbar.classList.add("bg-ocean-light","opacity-95");
        } else{
          navbar.classList.remove('bg-ocean-light',"opacity-95");
        }
    }
    window.addEventListener('scroll',handleScroll);

  }
    , []);
  
  const navStyle = home? "fixed w-full h-28 m-0 p-0 flex flex-row items-center bg-transparent text-white z-10 " : "m-0 p-0 flex flex-row bg-ocean text-white z-10 h-30";
  const navScroll = "";


  return (

    <nav className={navStyle} id="navbar">
      {/* left */}
      <div className=" ml-24 basis-1/4 text-[2em] font-serif">FOUND.</div>
      {/* right */}

      <div className=" basis-3/4 text-[1.3em] font-mono flex flex-row items-center justify-end">
        <div className="mr-8 "> About </div>
        <div className="mr-8"> Corporate Retreats</div>
        <div className="mr-8"> 中文 </div>
        <div className="mr-8">
          {!user && <button className="border-2 w-24 h-12"> <Link href="/auth">Log In</Link> </button>}
          {user && (
            <div className="dropdown w-24 relative ">
              <button className="dropbtn w-24 h-12 flex justify-center items-center">{user.given_name}</button>
              <div className="dropdown-content">
                <div><Link href="/trips">Trips</Link></div>
                <div>My Bookings</div>
                <div><button onClick={()=>{signOut().then(()=>{router.reload()});}}>Log Out</button></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );

};

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getUser,signOut } from "../../hooks/checkUserGetEmail";
import Link from "next/link";
import Cookies from 'js-cookie';



export default function Nav({home}) {
  const [email, setEmail] = useState(null);
  const router = useRouter(); 

  useEffect(async () => {
    const token = Cookies.get("userToken");
    const user = await getUser(token);
    if (user) { setEmail(user.email); }
  }
    , []);
  
  const navStyle = home? "m-0 p-0 flex flex-row bg-transparent text-white z-10 h-30" : "m-0 p-0 flex flex-row bg-ocean text-white z-10 h-30";


  return (
    
    <nav className={navStyle} >
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
                <div><button onClick={()=>{signOut().then(()=>{router.reload()});}}>Log Out</button></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  

  );

};

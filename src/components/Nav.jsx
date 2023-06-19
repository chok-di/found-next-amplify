"use client"
import React,{useState}from "react";
// import { NavLink } from "react-router-dom";
import nav_classes from '../styles/nav.module.css';

// import Register from "./auth/Register.jsx";
// import Login from "./auth/Login.jsx";

// import axios from "axios";

const Nav = (props) => {
  // const [user,setUser] = useState();
  const loggedIn = !!props.user;

  //display login/registeration form
  const [loginWindow, setLoginWindow] = useState(false);
  const [registerWindow,setRegisterWindow] = useState(false);

  const openLogin = () => {
    loginWindow ? setLoginWindow(false) : setLoginWindow(true);
  }

  const logOut = async(e) => {
    e.preventDefault();
    try{
      await axios.post("/users/logout");
      props.removeCookie("user",{path:'/'});
      return;
    } catch(err){
      console.log(err);
    }
  }


  return(
    <div className={nav_classes.nav_background}>
    <nav className="navbar navbar-expand-lg">
      <a className={`${nav_classes.logo} navbar-brand`} href="#">FOUND.</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
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
          {loggedIn && (
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {props.user.name}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="/trips">Book</a>
                <a class="dropdown-item" href="#">My Bookings</a>
                <a class="dropdown-item" href="#">Past Bookings</a>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" type="button" onClick={logOut} >Log Out</button>
              </div>
          </li>
          )}
          {!loggedIn && (
            <li class="nav-item">
            <button class={`nav-link ${nav_classes.nav_item} ${nav_classes.nav_button}`} onClick={openLogin}>Log In</button>
            </li>
          )}
        </ul>
      </div>  
    </nav>
  </div>
 );

};

export default Nav;
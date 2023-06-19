import React from "react";
import classes_footer from "../styles/Footer.module.css";

function Footer () {
  return(
    <>
    <footer>
      <h4>FOUND.</h4>
      <div className = {classes_footer["footer-flexbox"]}>
        <div>
        <div>About</div>
        <div>Contact Us</div>
        </div>
        <div>
        <div>For Individuals</div>
        <div>For Corporates</div>
        </div>
      </div>
    </footer>
    </>
  )

}

export default Footer;
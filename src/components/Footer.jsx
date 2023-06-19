import React from "react";
import classes_footer from "../styles/Footer.module.css";

function Footer () {
  return(
    // <div className={classes_footer["footer-container"]}>
    <div className={classes_footer["footer-container"]}>
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
    </div>
    // </div>
  )

}

export default Footer;
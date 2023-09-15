import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faYoutube, faPinterest } from "@fortawesome/free-brands-svg-icons";



function Footer() {
  return (
    <div className="pt-24 bg-brown text-[#ffffff]">
      <h4 className="ml-24 py-10 font-serif text-2xl">FOUND.</h4>
      <div className="ml-24 pb-12 font-mono flex flex-row">
        <div className="mr-12">
          <div>About</div>
          <div>Contact Us</div>
        </div>
        <div>
          <div>For Individuals</div>
          <div>For Corporates</div>
        </div>
      </div>
      <div className="ml-24 pb-24">
        <FontAwesomeIcon className="mr-6" icon={faFacebookF} />
        <FontAwesomeIcon className="mr-6" icon={faInstagram} />
        <FontAwesomeIcon className="mr-6" icon={faYoutube} />
        <FontAwesomeIcon className="mr-6" icon={faPinterest} />
      </div>
    </div>
  )

}

export default Footer;
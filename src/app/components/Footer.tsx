import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookF,
  faInstagram,
  faYoutube,
  faPinterest,
} from '@fortawesome/free-brands-svg-icons'

export const Footer = (): JSX.Element => {
  return (
    <div className="bg-brown text-[#ffffff]">
      <h4 className="pt-20 ml-24 font-serif text-3xl">FOUND.</h4>
      <div className="py-10 ml-24 font-mono flex flex-row">
        <div className="mr-12">
          <div>About</div>
          <div>Contact Us</div>
        </div>
        <div>
          <div>For Individuals</div>
          <div>For Corporates</div>
        </div>
      </div>
      <div className="pb-20 ml-24 ">
        <FontAwesomeIcon className="mr-6" icon={faFacebookF} />
        <FontAwesomeIcon className="mr-6" icon={faInstagram} />
        <FontAwesomeIcon className="mr-6" icon={faYoutube} />
        <FontAwesomeIcon className="mr-6" icon={faPinterest} />
      </div>
    </div>
  )
}

export default Footer

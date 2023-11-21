import React from "react";
import Image from 'next/image';


import a1 from "../../img/a1.jpg";
import a2 from "../../img/a2.jpg";
import b1 from "../../img/b1.jpg";
import b2 from "../../img/b2.jpg";


function Gallery() {
  return (
      <div className="grid grid-cols-4 gap-8 px-16 pb-8 h-[40rem]">
        <div className="grid grid-rows-3 gap-12">
          <div className="row-span-2 relative "> <Image src={a1} fill /></div>
          <div className="row-span-1 relative"> <Image src={a2} fill /> </div>
        </div>
        <div className="grid grid-rows-3 gap-12">
          <div className="row-span-1 relative "> <Image src={b1} fill /></div>
          <div className="row-span-2 relative"> <Image src={b2} fill /> </div>
        </div>
        <div className="grid grid-rows-3 gap-12">
          <div className="row-span-2 relative "> <Image src={a1} fill /></div>
          <div className="row-span-1 relative"> <Image src={a2} fill /> </div>
        </div>
        <div className="grid grid-rows-3 gap-12">
          <div className="row-span-1 relative "> <Image src={b1} fill/></div>
          <div className="row-span-2 relative"> <Image src={b2} fill /> </div>
        </div>
      </div>
  );
}
export default Gallery;
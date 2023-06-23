import React from "react";
import Image from 'next/image';
import gallery_classes from "../styles/gallery.module.css";

import a1 from "../../img/a1.jpg";
import a2 from "../../img/a2.jpg";
import b1 from "../../img/b1.jpg";
import b2 from "../../img/b2.jpg";


function Gallery (){
  return(
    <>
    <div className={gallery_classes.container}>
      <div class={`${gallery_classes.row}`}>
        <div className={`${gallery_classes.column}`}>
          <div className={`${gallery_classes.long}`}> <Image src={a1}/> </div>
          <div className={`${gallery_classes.short}`}> <Image src={a2}/> </div>
        </div>
        <div className={`${gallery_classes.column}`}>
          <div className={`${gallery_classes.short}`}><Image src={b1}/></div>
          <div className={`${gallery_classes.long}`}><Image src={b2} /></div>
        </div>
        <div className={`${gallery_classes.column}`}>
          <div className={`${gallery_classes.long}`}> <Image src={a1}/> </div>
          <div className={`${gallery_classes.short}`}> <Image src={a2}/> </div>
        </div>
        <div className={`${gallery_classes.column}`}>
          <div className={`${gallery_classes.short}`}><Image src={b1} /></div>
          <div className={`${gallery_classes.long}`}><Image src={b2} /></div>
        </div>
      </div>
    </div>
    </>
  );
}
export default Gallery;
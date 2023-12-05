import React, { useState } from "react";
import Image from 'next/image';




// const images = ['/img/a1','/img/a2','img/a3','img/a4','/img/a1','/img/a2','img/a3','img/a4'];

const images = ['/img/a1.jpg', '/img/a2.jpg', '/img/b1.jpg', '/img/b2.jpg','/img/c1.jpg', '/img/c2.jpg', '/img/d1.jpg', '/img/d2.jpg'];




function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openLightbox = (index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };


  const Lightbox = ({ images,currentImage, setCurrentImage, onClose }) => {
    const nextImage = () => {
      setCurrentImage((current) => (current + 1) % 8);
    };

    const prevImage = () => {
      setCurrentImage((current) => (current + 7) % 8);
    };

    return (
      <div className="z-30 fixed top-0 right-0 bottom-0 left-0 bg-black/80 flex items-center justify-center">
        <span className="absolute top-20 right-30 text-white cursor-pointer text-[30px] " onClick={onClose}>&times;</span>
        <span className="absolute top-1/2 left-4 text-white text-3xl cursor-pointer" onClick={prevImage}>&lt;</span>
        <span className="absolute top-1/2 right-4 text-white text-3xl cursor-pointer" onClick={nextImage}>&gt;</span>
        <div className="relative w-[80%] h-[70%]">
        <Image className=""src={images[currentImage]} alt={`Image ${currentImage}`} quality={100}fill objectFit="contain" />
        </div>
      </div>
    );
  };

  return (
    <>
    <div className="grid grid-cols-4 gap-8 px-16 pb-8 h-[40rem]">
      <div className="grid grid-rows-3 gap-12">
        <div className="row-span-2 relative " onClick={() => { openLightbox(0) }}> <Image src={"/img/a1.jpg" } quality={100} fill /></div>
        <div className="row-span-1 relative" onClick={() => { openLightbox(1) }}> <Image src={"/img/a2.jpg"} fill /> </div>
      </div>
      <div className="grid grid-rows-3 gap-12">
        <div className="row-span-1 relative " onClick={() => { openLightbox(2) }}> <Image src={"/img/b1.jpg"} fill /></div>
        <div className="row-span-2 relative" onClick={() => { openLightbox(3) }}> <Image src={"/img/b2.jpg"} fill objectFit="cover" /> </div>
      </div>
      <div className="grid grid-rows-3 gap-12">
        <div className="row-span-2 relative " onClick={() => { openLightbox(4) }}> <Image src={"/img/c1.jpg"} fill /></div>
        <div className="row-span-1 relative" onClick={() => { openLightbox(5) }}> <Image src={"/img/c2.jpg"} fill /> </div>
      </div>
      <div className="grid grid-rows-3 gap-12">
        <div className="row-span-1 relative " onClick={() => { openLightbox(6) }}> <Image src={"/img/d1.jpg"} fill /></div>
        <div className="row-span-2 relative" onClick={() => { openLightbox(7) }}> <Image src={"/img/d2.jpg"} fill /> </div>
      </div>
    </div>

    {
    lightboxOpen && (
      <Lightbox
        images={images}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
        onClose={closeLightbox}
      />
    )
    }

  </>
  );


}
export default Gallery;
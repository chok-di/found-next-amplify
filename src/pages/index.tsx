//import .env for local development
import 'dotenv/config';
import Link from 'next/link';


import Gallery from "../app/components/Gallery";
import Scheduler from "../app/components/Scheduler";



export default function Home() {
  return (

    <div className="m-0 p-0">
      <div className=" m-0 p-0 bg-[url('../img/background.jpg')]" >
        <span><h1 className="ml-24 pt-48 text-7xl font-serif text-white ">Let's Thrive Together.</h1></span>
        <div>
          <Link href="/trips">
          <button 
          className="ml-24 mt-24 mb-24 font-mono font-semibold text-ocean bg-white w-40 h-10 shadow-[2px_4px_4px_4px_rgba(0,0,0,0.4)]">
            Book Now &#8594; 
          </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-row bg-grey h-72">
        <div className="basis-1/3 text-center">
          <h3 className="font-serif text-2xl mt-16">UNPLUG</h3>
          <div className="font-jost mx-24 mt-4">Unplug and enjoy time away from digital distractions, and focus more on the present.</div>
        </div>
        <div className="basis-1/3 text-center">
          <h3 className="font-serif text-2xl mt-16">CONNECT</h3>
          <div className="font-jost mx-24 mt-4">Reconnext with ourselves, the ocean, nature and other like-minded individuals.</div>
        </div>
        <div className="basis-1/3 text-center">
          <h3 className="font-serif text-2xl mt-16">RECHARGE</h3>
          <div className="font-jost mx-24 mt-4">Recharge through daily yoga, water sports and activities,coaching sessions,seasonal menus, and comfortable accommodation.</div>
        </div>
      </div>

      <div className="bg-#ffffff">
        <h4 className="font-serif text-xl py-16 text-center">Photo Gallery</h4>
        <Gallery />
      </div>

      <div className="bg-#ffffff">
        <h4 className="font-serif text-xl py-16 text-center">Calendar</h4>
        <Scheduler />
      </div>
    </div>
  );
}

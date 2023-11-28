//import .env for local development
import 'dotenv/config';
import Link from 'next/link';

import {getAllTrips} from "../hooks/getTripInfo";

import Layout from "../app/components/Layout";
import Gallery from "../app/components/Gallery";
// import Scheduler from "../app/components/Scheduler";

import dynamic from 'next/dynamic';

import { GetServerSideProps } from 'next';

const Scheduler = dynamic(
  () => import('../app/components/Scheduler'),
  { ssr: false }
);

export const getServerSideProps: GetServerSideProps = async() => {
  const events = await getAllTrips();
  return {
    props:{
      events,
    },
  };
};


export default function Home({events}:{events:{}[]}) {
  console.log({events});

  return (
    <Layout home>
      <div className="relative mt-[700px]">
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
          <Scheduler events = {events} />
        </div>
        </div>
    </Layout>
  );
}

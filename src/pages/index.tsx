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

  return (
    <Layout home>
      <div className="relative">
        <div className="flex flex-row bg-grey h-96 justify-center items-center">
          <div className="basis-1/3 text-center">
            <h3 className="font-serif text-3xl">UNPLUG</h3>
            <div className="font-jost mx-24 mt-8">Unplug and enjoy time away from digital distractions, and focus more on the present.</div>
          </div>
          <div className="basis-1/3 text-center">
            <h3 className="font-serif text-3xl">CONNECT</h3>
            <div className="font-jost mx-24 mt-8">Reconnext with ourselves, the ocean, nature and other like-minded individuals.</div>
          </div>
          <div className="basis-1/3 text-center">
            <h3 className="font-serif text-3xl">RECHARGE</h3>
            <div className="font-jost mx-24 mt-8">Recharge through daily yoga, water sports and activities,coaching sessions,seasonal menus, and comfortable accommodation.</div>
          </div>
        </div>

        <div className="bg-#ffffff">
          <h4 className="font-serif text-3xl py-16 text-center">Photo Gallery</h4>
          <Gallery />
        </div>

        <div className="bg-#ffffff">
          <h4 className="font-serif text-3xl py-16 text-center">Calendar</h4>
          <Scheduler events = {events} />
        </div>
        </div>
    </Layout>
  );
}

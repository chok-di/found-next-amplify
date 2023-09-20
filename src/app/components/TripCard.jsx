import React from "react";
import Link from "next/link";
import Image from "next/image";

import a1 from "../../img/a1.jpg";


const TripCard = (props) => {
  console.log(props);


  return (
    <div className="flex justify-center">
      <div className="flex flex-row w-[80rem] my-10 justify-around shadow-[2px_4px_4px_4px_rgba(0,0,0,0.4)]">
        <div className="mt-8">
          <h3 className="mb-8 font-serif font-semibold text-2xl">{props.title}</h3>
          <p className='font-mono'>From:&nbsp;{props.start_time}</p>
          <p className='font-mono'>To:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.end_time}</p>
          <div className="font-mono py-8">
            {(!props.is_full && !props.is_booked) &&
              <Link href={`/trip/${props.id}`}>
                <button className="w-20 h-8 mr-4  bg-ocean text-white text-center">Book</button>
              </Link>}
            {props.is_full && <button>Full</button>}
            {props.is_booked && <button className="w-20 h-8 mr-4 bg-ocean text-white text-center">Booked</button>}
            <Link href={`/trip/${props.id}`}>
              <button className="w-20 h-8 bg-ocean text-white text=center">Details</button>
            </Link>
          </div>
        </div>
        <div className="pt-8">
          <Image width={220} height={150} src={a1} />
        </div>
      </div>
    </div>

  )
}

export default TripCard;

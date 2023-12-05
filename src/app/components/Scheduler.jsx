"use client";

import React, { useState,useEffect } from "react";
import Calendar from "react-calendar";
import Link from "next/link";


function Scheduler(props) {
  const events = props.events;
  const firstEvent = events[0]
  const [displayEvent,setEvent] = useState(firstEvent);

  function highlightEventDays(date) {
    for (let event of events){
      console.log(event.start_time)
      let startDate = new Date(event.start_time).setHours(0, 0, 0, 0);
      let endDate = new Date(event.end_time).setHours(0, 0, 0, 0);
      let eachDay = date.date.setHours(0, 0, 0, 0);
      if (eachDay > startDate && eachDay < endDate) {
        return `eventDays event_${event.id}`;
      }
      if (eachDay == startDate) {
        return "eventStartDay eventDays";
      }
      if (eachDay == endDate) {
        return "eventEndDay eventDays";
      }
    }   
    return {}
  }

  const handleTileClick = (date) => {
    const event = events.filter(event => new Date(event.start_time) <= date && new Date(event.end_time)>= date)[0];
    if (event){
      setEvent(event);
      console.log("even set:" + event);
    }
  };


  let activities = displayEvent.description.split("&").map(activity => { return (<div> &#8226;    {activity}</div>) });

  return (
    <div className="flex flex-row pb-24">
      <div className="mx-24 w-1/2">
        <Calendar
          value={new Date(2023,0,1)}
          tileClassName={highlightEventDays}
          onClickDay={handleTileClick}
          maxDate = {new Date(2025,3,1)}
          minDate = {new Date()}
          minDetail={"month"}
        />
      </div>
      <div className="mx-8 w-1/2 font-mono">
        <div className="font-semibold">{displayEvent.title} </div>
        <div className="font-semibold">{new Date(displayEvent.start_time).toLocaleDateString()} to {new Date(displayEvent.end_time).toLocaleDateString()} </div>
        <div><span className="font-semibold">{displayEvent.available_spots} spots left</span> ({displayEvent.total_spots} spots total)</div>
        <div>From <span className="font-semibold">${displayEvent.price} (CAD)</span></div>
        <br/>
        <span className="font-semibold"> What's included:</span>
        {activities}
        <Link href={"#"}><button className="bg-ocean text-white font-mono font-semibold w-24 h-8">Book</button></Link>
      </div> 
   

    </div>
  );
}
export default Scheduler;


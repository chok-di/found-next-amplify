"use client";

import React, { useState,useEffect } from "react";
import Calendar from "react-calendar";
// import  "../styles/Scheduler.module.css";


// 


function Scheduler(props) {
  const events = props.events;
  console.log(events);
  const firstEvent = events[0]
  const [displayEvent,setEvent] = useState(firstEvent);
  console.log({displayEvent});
  // let event = events[0];
  // let startTime = event.start;
  // let endTime = event.end
  // let price = event.price;


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
          maxDate = {new Date(2024,1,1)}
          minDate = {new Date(2023,0,1)}
          minDetail={"month"}
        />
      </div>
      <div className="mx-8 w-1/2 font-mono">
        <div className="font-semibold">{displayEvent.start_time.toLocaleString()} to {displayEvent.end_time.toLocaleString()} </div>
        <div><span className="font-semibold">{displayEvent.available_spots} spots left</span> ({displayEvent.total_spots} spots total)</div>
        <div>From <span className="font-semibold">${displayEvent.price} (CAD)</span></div>
        <br />
        <br />
        <span className="font-semibold"> What's included:</span>
        {activities}
        <button>Book</button>
      </div> 
   

    </div>
  );
}
export default Scheduler;



  //const events = [
  //   { "id":1,
  //     "title": "YiLan",
  //     "total_spots": 10,
  //     "available_spots": 8,
  //     "start": new Date(2023, 0, 5, 8, 0),
  //     "end": new Date(2023, 0, 19, 18, 0),
  //     "price": 2500,
  //     "description":
  //       ["Daily yoga classes",
  //         "Daily surf/SUP sessions(equipment provided)",
  //         "Daily coaching sessions(We also provide optional 1-on-1 life coaching sessions)",
  //         "Daily meals(seasonal menus with locally sourced ingredients)",
  //         "6 nights accommodation(shared room with one other person and en-suite bathroom)"]
  //   },
  //   {
  //     "id":2,
  //     "title": "YiLan",
  //     "total_spots": 10,
  //     "available_spots": 8,
  //     "start": new Date(2023, 1, 5, 8, 0),
  //     "end": new Date(2023, 1, 19, 18, 0),
  //     "price": 2500,
  //     "description":
  //       ["Daily yoga classes",
  //         "Daily surf/SUP sessions(equipment provided)",
  //         "Daily coaching sessions(We also provide optional 1-on-1 life coaching sessions)",
  //         "Daily meals(seasonal menus with locally sourced ingredients)",
  //         "6 nights accommodation(shared room with one other person and en-suite bathroom)"]
  //   }
  // ];
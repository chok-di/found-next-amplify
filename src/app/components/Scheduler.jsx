"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import  "../styles/Scheduler.module.css";




const events = [
  {
    "title": "YiLan",
    "total_spots": 10,
    "available_spots": 8,
    "start": new Date(2023, 0, 5, 8, 0),
    "end": new Date(2023, 0, 19, 18, 0),
    "price": 2500,
    "description":
      ["Daily yoga classes",
        "Daily surf/SUP sessions(equipment provided)",
        "Daily coaching sessions(We also provide optional 1-on-1 life coaching sessions)",
        "Daily meals(seasonal menus with locally sourced ingredients)",
        "6 nights accommodation(shared room with one other person and en-suite bathroom)"]
  }
];


function Scheduler() {
  let event = events[0];
  let startTime = event.start;
  let endTime = event.end
  let price = event.price;

  function highlightEventDays(date) {
    let startDate = startTime.setHours(0, 0, 0, 0);
    let endDate = endTime.setHours(0, 0, 0, 0);
    let eachDay = date.date.setHours(0, 0, 0, 0);


    if (eachDay > startDate && eachDay < endDate) {
      return "eventDays";
    }
    if (eachDay == startDate || eachDay == endDate) {
      return "eventStartEndDays";
    }
    return {}
  }

  let activities = events[0].description.map(activity => { return (<div> &#8226;    {activity}</div>) });

  return (
    <div className="flex flex-row">
      <div className="mx-24 w-1/2">
        <Calendar
          value={startTime}
          tileClassName={highlightEventDays}
        />
      </div>

      <div className="mx-8 w-1/2 font-mono">
        <div className="font-semibold">{startTime.toLocaleString()} to {endTime.toLocaleString()} </div>
        <div><span className="font-semibold">{event.available_spots} spots left</span> ({event.total_spots} spots total)</div>
        <div>From <span className="font-semibold">${price} (CAD)</span></div>
        <br />
        <br />
        <span className="font-semibold"> What's included:</span>
        {activities}
      </div>

    </div>
  );
}
export default Scheduler;
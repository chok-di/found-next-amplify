import React from "react";
import classes_TripCard from "../styles/tripcard.module.css";
import Link from "next/link";



const TripCard = (props) => {
  console.log(props);
  
 
  return(
    <div className={classes_TripCard.card}>
      <div>
        <h3>{props.title}</h3>
        <p>From:&nbsp;{props.start_time}</p>
        <p>To:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.end_time}</p>
        {(!props.is_full && !props.is_booked) && <button><Link href={`/trip/${props.id}`}>book</Link></button>}
        {props.is_full && <button>Full</button>}
        {props.is_booked && <button>Booked</button>}
        <button><Link href={`/trip/${props.id}`}>Details</Link></button>
      </div>
      <div>
        <img className={classes_TripCard.cover} src="https://media.nomadicmatt.com/2022/iscancunsafe.jpeg"/>
      </div>
    </div>
  
  )
}

export default TripCard;

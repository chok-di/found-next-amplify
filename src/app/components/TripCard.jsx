import React from "react";
import classes_TripCard from "../styles/tripcard.module.css";



const TripCard = (props) => {
  return(
    <div className={classes_TripCard.card}>
      <div>
        <h3>{props.title}</h3>
        <p>From:&nbsp;{props.start_time}</p>
        <p>To:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.end_time}</p>
        <a href={`/trips/${props.id}`}><button>book</button></a>
      </div>
      <div>
        <img className={classes_TripCard.cover} src="https://media.nomadicmatt.com/2022/iscancunsafe.jpeg"/>
      </div>
    </div>
  
  )
}

export default TripCard;

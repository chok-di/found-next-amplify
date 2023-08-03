import React from "react";
import { bookTrip, canceltrip } from "../../hooks/bookCancelTrip.js";

function Confirm(props) {

  const handleBook = async () => {
    try{
      const response = await bookTrip(props.email,props.tripId);
    } catch(err){
      console.log(err);
    }
  }

  const handleCancel = async() => {
    try{
      const response = await canceltrip(props.email, props.tripId);
    } catch(err){
      console.log(err);
    }
  }

  let handler,message;
  switch(props.action){
    case "book":
      handler = handleBook;
      message = "confirm booking?"
      break;
    case "cancel":
      handler = handleCancel;
      message = "confirm cancellation?"
      break;
  }

  return(
    <>
      <h1>{message}</h1>
      <button onClick={handler}>yes</button>
      <button onClick={()=>props.setShow(false)}>no</button>
    </>
  )
}

export default Confirm;
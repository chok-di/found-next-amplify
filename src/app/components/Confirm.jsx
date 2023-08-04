import React from "react";
import { bookTrip, canceltrip } from "../../hooks/bookCancelTrip.js";

function Confirm(props) {
  console.log(props);

  const handleBook = async () => {
    try{
      props.setStatus("waiting");
      const response = await bookTrip(props.email,props.tripId);
      props.setStatus("complete");
    } catch(err){
      console.log(err);
    }
  }

  const handleCancel = async() => {
    try{
      props.setStatus("waiting");
      const response = await canceltrip(props.email, props.tripId);
      props.setStatus("complete");
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
    case "wating":
      message = "waiting"
      break;
    case "complete":
      message = "go back";
      break;
  }

  return(
    <>
      {(props.action == "book" || props.action == "cancel" )&& 
        <> 
          <h1>{message}</h1>
          <button onClick={handler}>yes</button>
          <button onClick={()=>props.setStatus(null)}>no</button>
        </>
      }

      {props.action == "waiting" && 
        <>
          <h1>{message}</h1>
        </>
      }

      {props.action == "complete" && 
        <>
          <h1>{message}</h1>
        </>
      }
    </>
  )
}

export default Confirm;
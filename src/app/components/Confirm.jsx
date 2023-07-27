import React from "react";

import { bookTrip } from "../../hooks/bookCancelTrip.js";

function Confirm(props) {

  console.log(bookTrip);
  const handleBook = async () => {
    try{
      const response = await bookTrip(props.email,props.tripId);
    } catch(err){
      console.log(err);
    }
  }

  return(
    <>
      <h1>confirm booking?</h1>
      <button onClick={handleBook}>yes</button>
      <button onClick={()=>props.setShow(false)}>no</button>
    </>
  )
}

export default Confirm;
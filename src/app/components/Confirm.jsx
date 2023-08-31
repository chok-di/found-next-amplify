"use client";
import React, { useState } from "react";
import { useRouter } from 'next/router';
import { bookTrip, canceltrip } from "../../hooks/bookCancelTrip.js";


function Confirm(props) {
  const { is_booked, is_full, email, tripId } = props;
  const [status, setStatus] = useState(null);

  const router = useRouter();
 


  const handleBook = async () => {
    try {
      setStatus("waiting");
      const response = await bookTrip(props.email, props.tripId);
      setStatus("complete");
    } catch (err) {
      console.log(err);
    }
  }

  const handleCancel = async () => {
    try {
      setStatus("waiting");
      const response = await canceltrip(props.email, props.tripId);
      setStatus("complete");
    } catch (err) {
      console.log(err);
    }
  }

  let handler, message;
  switch (status) {
    case "book":
      handler = handleBook;
      message = "confirm booking?"
      break;
    case "cancel":
      handler = handleCancel;
      message = "confirm cancellation?"
      break;
    case "waiting":
      message = "waiting"
      break;
    case "complete":
      message = "go back";
      break;
  }

  return (
    <>
      {is_booked &&
        <>
          <button> Booked </button>
          <button onClick={() => { setStatus("cancel") }}> Cancel </button>
        </>
      }
      {!is_full && !is_booked && email &&
        <button onClick={() => { setStatus("book") }}>Book</button>
      }
      {!is_full && !is_booked && !email &&
        <button><Link href={'/auth'}>LogIn</Link></button>
      }
      {is_full && <button>Full</button>}

      {(status == "book" || status == "cancel") &&
        <>
          <h1>{message}</h1>
          <button onClick={handler}>yes</button>
          <button onClick={() => props.setStatus(null)}>no</button>
        </>
      }

      {status == "waiting" &&
        <>
          <h1>{message}</h1>
        </>
      }

      {status == "complete" &&
        <>
          <h1>{message}</h1>
          <button onClick={router.reload()}>
            back
          </button>
        </>
      }
    </>
  )
}

export default Confirm;
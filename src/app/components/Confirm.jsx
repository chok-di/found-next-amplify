"use client";
import React, { useState } from "react";
import { useRouter } from 'next/router';
import { bookTrip, canceltrip } from "../../hooks/bookCancelTrip.js";
import Link from "next/link";


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
      message = "Cancel booking?"
      break;
    case "waiting":
      message = "waiting"
      break;
    case "complete":
      message = "Action complete.";
      break;
  }

  return (
    <div className="">
      {is_booked &&
        <div className="flex space-x-8">
          <button className="bg-ocean hover:bg-deep-ocean text-white px-4 py-2 w-18 rounded"> Booked </button>
          <button  className="bg-ocean hover:bg-blue-600 text-white px-4 py-2 w-18 rounded"
               onClick={() => { setStatus("cancel") }}> Cancel 
          </button>
        </div>
      }
      {!is_full && !is_booked && email &&
        <button onClick={() => { setStatus("book") }}>Book</button>
      }
      {!is_full && !is_booked && !email &&
        <button className="bg-ocean hover:bg-deep-ocean text-white px-4 py-2 w-18 rounded"><Link href={'/auth'}>LogIn</Link></button>
      }
      {is_full && <button>Full</button>}

      {status &&
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-sand text-black border-2 p-4 rounded-md w-[40rem] h-[15rem] flex flex-col items-center">
              <h1 className="font-mono text-3xl mt-8 mb-8">{message}</h1>
              {(status == "book" || status == "cancel") &&
                <div className="flex space-x-16">
                  <button
                    className="bg-ocean hover:bg-blue-600 text-white p-2 w-16 rounded"
                    onClick={handler}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-ocean hover:bg-red-600 text-white p-2 w-16 rounded"
                    onClick={() => setStatus(null)}
                  >
                    No
                  </button>
                </div>}
              {status == "complete" &&
                <button 
                className=" bg-ocean hover:bg-red-600 text-white p-2 w-16 rounded"
                onClick={router.reload()}>
                  back
                </button>}
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default Confirm;
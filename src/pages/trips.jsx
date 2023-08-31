import React from "react";
import TripCard from "../app/components/TripCard";
import { getUser } from "../hooks/checkUserGetEmail.js";
import { getAllTrips, getAllBookings } from "../hooks/getTripInfo.js";

// import Scheduler from "../components/Scheduler";



export async function getServerSideProps(context) {
  const token = context.req.cookies.userToken;
  const user = await getUser(token);
  const email = user ? user.email : null;


  let trips, bookings = null;
  try {
    trips = await getAllTrips();
    bookings = await getAllBookings();
  } catch (err) {
    console.error("Failed to fetch trips", err);
    trips, bookings = null;
  }
  return { props: { trips, bookings, email } }
}



const BookEventPage = ({ trips, bookings, email }) => {

  const bookingsInformation = JSON.parse(bookings.Payload).body;
  const tripInformation = JSON.parse(trips.Payload).body
    .map((trip) => {
      const bookedUser = bookingsInformation
        .filter((booking) => booking.trip_id == trip.id)
        .map((booking) => booking.email
        );
      // console.log({email});
      // console.log({bookedUser});

      const is_full = bookedUser.length == trip.total_spots
      const is_booked = bookedUser.includes(email);
      // console.log(is_booked);

      return (
        <>
          <TripCard
            trip={trip}
            id={trip.id}
            title={trip.title}
            start_time={trip.start_time}
            end_time={trip.end_time}
            is_full={is_full}
            is_booked={is_booked}
          />
        </>
      );
    });

  return (
    <>
      <h2>Book Events</h2>
      {tripInformation}

      {/* <Scheduler/> */}

    </>
  )
}

export default BookEventPage;





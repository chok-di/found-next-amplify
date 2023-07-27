import React from "react";
import TripCard from "../app/components/TripCard";
import {getToken} from "../hooks/checkUserGetEmail.js";
import {getAllTrips, getAllBookings} from "../hooks/getTripInfo.js";

// import Scheduler from "../components/Scheduler";



export async function getServerSideProps(context) {
  const token = context.req.cookies.userToken;
  const user = token? await getToken(token) : null;
  const email = user? user.decoded.email : null;

  let trips, bookings;
  try {
    trips = await getAllTrips();
    bookings = await getAllBookings();
  } catch (err) {
    console.error("Failed to fetch trips", err);
    trips, bookings = null;
  }
  return { props: { trips, bookings , email } }
}



const BookEventPage = ({trips,bookings, email}) => {
  
  const bookingsInformation = JSON.parse(bookings.Payload).body;
  const tripInformation = JSON.parse(trips.Payload).body
    .map((trip) => {
      const bookedUser = bookingsInformation
        .filter((booking) => booking.trip_id == trip.id)
        .map((booking) => booking.email);

      const is_full = bookedUser.length == trip.total_spots
      const is_booked = email in bookedUser;

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





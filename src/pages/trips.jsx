
import TripCard from "../app/components/TripCard";
import { getUser } from "../hooks/checkUserGetEmail.js";
import { getAllTrips, getAllBookings } from "../hooks/getTripInfo.js";

import Layout from "../app/components/Layout";


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

      
      const is_full = bookedUser.length == trip.total_spots
      const is_booked = bookedUser.includes(email);
      const start = new Date(trip.start_time).toLocaleString();
      const end = new Date(trip.end_time).toLocaleString();
    
   

      return (
      
        <div className=" flex flex-col justify-center align-center">
          <TripCard
            trip={trip}
            id={trip.id}
            title={trip.title}
            start_time={start}
            end_time={end}
            is_full={is_full}
            is_booked={is_booked}
          />
        </div>
      );
    });

  return (
    
     <Layout>
      {tripInformation}

      {/* <Scheduler/> */}

    </Layout>
  )
}

export default BookEventPage;





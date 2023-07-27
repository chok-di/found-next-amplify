import React from "react";
import AWS from 'aws-sdk';
import Cookies from 'js-cookie';
import TripCard from "../app/components/TripCard";
import {getToken} from "../hooks/checkUserGetEmail.js";
import {getAllTrips, getAllBookings} from "../hooks/getTripInfo.js";

// import Scheduler from "../components/Scheduler";


AWS.config.region = "us-east-2";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-2:7dc220ca-2c98-428d-86c2-83fa56c53ebd"
});

export async function getServerSideProps(context) {
  const token = context.req.cookies.userToken;
  const user = token? await getToken(token) : null;
  const email = user? user.decoded.email : null;


  // const lambda = new AWS.Lambda();
  // const params1 = {
  //   FunctionName: 'foundtrips-dev',
  //   InvocationType: 'RequestResponse',
  //   LogType: 'Tail',
  //   Payload: JSON.stringify({ key1: 'value1', key2: 'value2' })
  // };

  // const params2 = {
  //   FunctionName: 'foundallbookings-dev',
  //   InvocationType: 'RequestResponse',
  //   LogType: 'Tail',
  //   Payload: JSON.stringify({ key1: 'value1', key2: 'value2' })
  // };

  // const lambdaPromise1 = new Promise((resolve, reject) => {
  //   lambda.invoke(params1, function (err, data) {
  //     if (err) {
  //       console.error("Error invoking Lambda function", err);
  //       reject(err);
  //     } else {
  //       resolve(data);
  //     }
  //   });
  // });

  // const lambdaPromise2 = new Promise((resolve, reject) => {
  //   lambda.invoke(params2, function (err, data) {
  //     if (err) {
  //       console.error("Error invoking Lambda function", err);
  //       reject(err);
  //     } else {
  //       resolve(data);
  //     }
  //   });
  // });


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
      console.log("booked?");
      console.log(is_booked);
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





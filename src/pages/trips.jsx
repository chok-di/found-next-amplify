import React from "react";
import AWS from 'aws-sdk';
import Cookies from 'js-cookie';
import TripCard from "../app/components/TripCard";
import {getToken} from "../hooks/checkUserGetEmail.js";

// import Scheduler from "../components/Scheduler";


AWS.config.region = "us-east-2";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-2:7dc220ca-2c98-428d-86c2-83fa56c53ebd"
});

export async function getServerSideProps(context) {
  const token = context.req.cookies.userToken;
  const user = token? getToken(token) : null;
  console.log({user});

  const lambda = new AWS.Lambda();
  const params1 = {
    FunctionName: 'foundtrips-dev',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({ key1: 'value1', key2: 'value2' })
  };

  const params2 = {
    FunctionName: 'foundallbookings-dev',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({ key1: 'value1', key2: 'value2' })
  };

  const lambdaPromise1 = new Promise((resolve, reject) => {
    lambda.invoke(params1, function (err, data) {
      if (err) {
        console.error("Error invoking Lambda function", err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

  const lambdaPromise2 = new Promise((resolve, reject) => {
    lambda.invoke(params2, function (err, data) {
      if (err) {
        console.error("Error invoking Lambda function", err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

  // lambdaPromise that has all booking data
  let trips, bookings;
  try {
    [trips, bookings] = await Promise.all([lambdaPromise1, lambdaPromise2]);
  } catch (err) {
    console.error("Failed to fetch trips", err);
    trips, bookings = null;
  }
  return { props: { trips, bookings } }
}





const BookEventPage = ({trips,bookings}) => {
  const bookingsInformation = JSON.parse(bookings.Payload).body;
  const tripInformation = JSON.parse(trips.Payload).body
    .map((trip) => {
      const bookedUser = bookingsInformation
        .filter((booking) => booking.trip_id == trip.id)
        .map((booking) => booking.email);

      const is_full = bookedUser.length == trip.total_spots
      return (
        <>
          <TripCard
            trip={trip}
            id={trip.id}
            title={trip.title}
            start_time={trip.start_time}
            end_time={trip.end_time}
            is_full={is_full}
            bookedUser={bookedUser}
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





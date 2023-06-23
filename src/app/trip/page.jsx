"use client";

import "dotenv/config";

console.log(process.env);
import React, { useState, useEffect } from "react";

import AWS from 'aws-sdk';

AWS.config.region= "us-east-2";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId:"us-east-2:7dc220ca-2c98-428d-86c2-83fa56c53ebd"
});

// AWS.config = new AWS.Config({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: 'us-east-2'
// });


// AWS.config.update({
//   accessKeyId:process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
//   region: 'us-east-2'
// });

// import TripCard from "../components/TripCard";

// import Scheduler from "../components/Scheduler";

const BookEventPage = () => {
  // const [trips, setTrips] = useState([]);

  async function getAllTrips() {
    const lambda = new AWS.Lambda();

    const params = {
      FunctionName: 'foundtrips-dev',
      InvocationType: 'RequestResponse',
      LogType: 'Tail',
      Payload: JSON.stringify({ key1: 'value1', key2: 'value2' })
    };

    lambda.invoke(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
      }
    })

  }

  //load trip information
  useEffect(() => {
    getAllTrips();
  }, []);


  // const tripInformation = trips.map((trip) => {
  //   return (
  //     <>
  //       <TripCard
  //         trip={trip}
  //         id={trip.id}
  //         title={trip.title}
  //         start_time={trip.start_time}
  //         end_time={trip.end_time}
  //       />
  //     </>
  //   );
  // });



  return (
    <>
      <h2>Book Events</h2>
      {/* {tripInformation} */}

      {/* <Scheduler/> */}

    </>
  )
}

export default BookEventPage;
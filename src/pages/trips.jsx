// "use client";

import "dotenv/config";
import React from "react";
import AWS from 'aws-sdk';

import TripCard from "../app/components/TripCard";

// import Scheduler from "../components/Scheduler";


AWS.config.region = "us-east-2";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-2:7dc220ca-2c98-428d-86c2-83fa56c53ebd"
});

export async function getServerSideProps() {
  const lambda = new AWS.Lambda();
  const params = {
    FunctionName: 'foundtrips-dev',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({ key1: 'value1', key2: 'value2' })
  };

  const lambdaPromise = new Promise((resolve, reject) => {
    lambda.invoke(params, function (err, data) {
      if (err) {
        console.error("Error invoking Lambda function", err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  let trips;
  try {
    // await the Lambda invocation
    trips = await lambdaPromise;
  } catch (err) {
    console.error("Failed to fetch trips", err);
    trips = null;
  }
  return { props: { trips } }
}





const BookEventPage = ({ trips }) => {
  console.log({ trips });
  const tripInformation = JSON.parse(trips.Payload).body
    .map((trip) => {
      return (
        <>
          <TripCard
            trip={trip}
            id={trip.id}
            title={trip.title}
            start_time={trip.start_time}
            end_time={trip.end_time}
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





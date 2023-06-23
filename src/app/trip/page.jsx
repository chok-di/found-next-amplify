import React, { useState, useEffect } from "react";
import AWS from 'aws-sdk';
AWS.config, update({ region: 'us-east-2' });
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
import { useState } from "react";

import Confirm from "../../app/components/Confirm";
import AWS from 'aws-sdk';
import { getToken } from "../../hooks/checkUserGetEmail.js";

AWS.config.region = "us-east-2";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-2:7dc220ca-2c98-428d-86c2-83fa56c53ebd"
});


export async function getServerSideProps(context) {
  const token = context.req.cookies.userToken;
  const user = token? await getToken(token) : null;
  const email = user? user.decoded.email: "not logged in";
  const tripId = context.params.id;


  const lambda = new AWS.Lambda();
  
  const params1 = {
    FunctionName: 'foundtripdetail-dev',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({ tripId: `${tripId}` })
  };

  const params2 = {
    FunctionName: 'foundtripcheckbooked-dev',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({ tripId: `${tripId}`, email: `${email}` })
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

  let trip, is_booked;
  try {
    [trip,is_booked] = await Promise.all([lambdaPromise1,lambdaPromise2]);
  } catch (err) {
    console.error("Failed to fetch trips", err);
    trip = null;
  }
  return { props: { email, trip, is_booked } }
}



const EventDetailPage = ({ email, trip, is_booked }) => {
  console.log({ trip });
  // console.log({ isBooked });
  trip = JSON.parse(trip.Payload).body[0];
  const is_full = trip.available_spots == 0;
  const description = trip.description.split("&").map(line => <p>{line}</p>);

  const [confirm, setConfirm] = useState(false);

  return (
    <>
      <h4>{trip.title}</h4>
      {is_booked && <p>You've already booked this trip</p>}
      {description}
      {trip.start_time}
      {trip.end_time}
      {trip.total_spots}
      {trip.available_spots}
    
      {is_booked &&
      <>
       <button> Booked </button>
       <button>Cancel</button> 
      </>
      }
      {!is_full && !is_booked &&
      <button onClick = {() => { setConfirm(true) }}>Book</button>
      }
      {is_full && <button>Full</button>}
      {confirm && <Confirm email={email} tripId={trip.id} setShow={setConfirm} />}
     
      {/* {booked? 
    <>
    <button>Booked</button>
    <button>Cancel</button>
    </>:
    <button onClick={()=>{setConfirm(true)}}> Book! </button>}
    
  
    {status && <Status back={()=>{setStatus(false)}}/>}  */}
    </>
  );
}

export default EventDetailPage;
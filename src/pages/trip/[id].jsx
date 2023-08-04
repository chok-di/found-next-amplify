"use client";
import { useState } from "react";
import Link from 'next/link';
import Confirm from "../../app/components/Confirm";
import AWS from 'aws-sdk';
import { getUser } from "../../hooks/checkUserGetEmail.js";


AWS.config.region = "us-east-2";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-2:7dc220ca-2c98-428d-86c2-83fa56c53ebd"
});


export async function getServerSideProps(context) {
  const token = context.req.cookies.userToken;
  const user = token? await getUser(token) : null;
  const email = user? user.email: null;
  
  const tripId = context.params.id;

  console.log("email is");
  console.log(email);


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

  console.log(email);

  is_booked = JSON.parse(is_booked.Payload);
  trip = JSON.parse(trip.Payload).body[0];
  const is_full = trip.available_spots == 0;
  const description = trip.description.split("&").map(line => <p>{line}</p>);

  // const [confirm, setConfirm] = useState(false);
  const [status, setStatus] = useState(null);


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
       <button onClick={()=>{setStatus("cancel")}}> Cancel </button> 
      </>
      }
      {!is_full && !is_booked && email &&
      <button onClick = {() => { setStatus("book") }}>Book</button>
      }
      {!is_full && !is_booked && !email &&
      <button><Link href={'/auth'}>LogIn</Link></button>
      }
      {is_full && <button>Full</button>}
      {status && <Confirm email={email} tripId={trip.id} action={status} setStatus={setStatus} />}
      {/* {status=="cancel" && <Confirm email={email} tripId={trip.id} action="cancel" setShow={setConfirm} />}
      {status == "waiting" && <Confirm action/>}
     */}
     
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
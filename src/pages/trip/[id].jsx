import Image from "next/image";
import Confirm from "../../app/components/Confirm";
import AWS from 'aws-sdk';
import { getUser } from "../../hooks/checkUserGetEmail.js";
AWS.config.region = "us-east-2";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-2:7dc220ca-2c98-428d-86c2-83fa56c53ebd"
});


export async function getServerSideProps(context) {
  const token = context.req.cookies.userToken;
  const user = token ? await getUser(token) : null;
  const email = user ? user.email : null;
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
    [trip, is_booked] = await Promise.all([lambdaPromise1, lambdaPromise2]);
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
  const description = trip.description.split("&").map(line => <li>{line}</li>);



  return (
    // <div className=" relative container mx-auto p-8 space-y-6 bg-grey shadow-md rounded-lg">
    <div className="relative z-0">
      <h4 className="text-4xl font-serif text-center mb-4">{trip.title}</h4>
      <div className="relative">
        <Confirm is_booked={is_booked} is_full={is_full} email={email} tripId={trip.id}/>
      </div>

      {is_booked && <p className="font-mono">You've already booked this trip</p>}
      <div className="box-content w-1/5 font-inter flex flex-col border-2 ">
          <span>start: {trip.start_time} </span>
          <span>end: {trip.end_time} </span>
          <span>3 days</span>
          <span>{trip.available_spots}/{trip.total_spots}</span>
          <span>$1000</span>
      </div>
      <h2 class="text-xl font-semibold mb-2">Included:</h2>
      <ul className="list-disc pl-5 space-y-2 ">
      {description}
      </ul>
      <div class="flex space-x-4 mt-6">
        <button class="bg-gray-400 px-6 py-2 rounded text-gray-700 font-semibold">Booked</button>
        <button class="bg-red-500 px-6 py-2 rounded text-gray-700 font-semibold">Cancel</button>
      </div>






    </div>
  );
}

export default EventDetailPage;
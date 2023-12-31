import Image from "next/image";
import Confirm from "../../app/components/Confirm";
import AWS from 'aws-sdk';
import { getUser } from "../../hooks/checkUserGetEmail.js";
import { getTripDetails } from "../../hooks/getTripInfo.js";
import Layout from "../../app/components/Layout";


AWS.config.region = "us-east-2";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-2:7dc220ca-2c98-428d-86c2-83fa56c53ebd"
});


export async function getServerSideProps(context) {
  const token = context.req.cookies.userToken;
  const user = token ? await getUser(token) : null;
  const email = user ? user.email : null;
  const tripId = context.params.id;
  const data = await getTripDetails(email, tripId);
  console.log(data);

  return { props: { email, data } }
}



const EventDetailPage = ({ email, data }) => {


  let is_booked = JSON.parse(data.is_booked.Payload);
  let trip = JSON.parse(data.trip.Payload).body[0];
  const is_full = trip.available_spots == 0;
  const description = trip.description.split("&").map(line => <li>{line}</li>);

  const start = new Date(trip.start_time).toLocaleString();
  const end = new Date(trip.end_time).toLocaleString();



  return (


    <Layout>
      {/* background pic */}
      <div className="fixed inset-0 bg-[url('/img/background.jpg')]  z-[-10] opacity-50"></div>
      {/* main container */}
      <div className=" relative container mx-auto my-16 p-8 space-y-6  bg-sand bg-opacity-70 shadow-md">
        <h4 className="text-4xl font-serif text-center mb-4">{trip.title}</h4>
        <div className="flex flex-row space-x-12">
          <div className="w-2/3 space-y-6">
              <div className="relative">
                <Confirm is_booked={is_booked} is_full={is_full} email={email} tripId={trip.id} />
              </div>

              <div className="w-2/5 font-mono text-lg flex flex-col p-4 bg-seashell border rounded-lg border-light-ocean shadow-md space-y-2">
                <span className="text-deep-ocean"><span className="font-mono font-semibold">Start:</span> {start} </span>
                <span className="text-deep-ocean"><span className="font-mono font-semibold">End: </span>{end} </span>
                <div className="flex flex-row space-x-4">
                  <span className="text-driftwood">3 days</span>
                  <span className="text-brown">{trip.available_spots}/{trip.total_spots}</span>
                  <span className="text-ocean font-bold">$1000</span>
                </div>
              </div>


              <h2 className="text-2xl font-semibold mb-2 text-ocean">Included:</h2>

              <ul className="list-disc pl-5 space-y-2 ">
                {description}
              </ul>
          </div>
          <div className="w-1/3 space-y-6 max-h-[60rem] overflow-y-auto">
            <Image src="/img/a1.jpg" width={300} height={250}></Image>
            <Image src="/img/a1.jpg" width={300} height={250}></Image>
            <Image src="/img/a1.jpg" width={300} height={250}></Image>
            <Image src="/img/a1.jpg" width={300} height={250}></Image>
            <Image src="/img/a1.jpg" width={300} height={250}></Image>
            <Image src="/img/a1.jpg" width={300} height={250}></Image>
     
    
          </div>
        </div>
        
      </div>
    </Layout>


  );
}

export default EventDetailPage;



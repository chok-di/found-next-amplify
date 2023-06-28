import {useState} from "react";

import AWS from 'aws-sdk';
// import Confirm from "../components/book/Confirm.jsx";
// import Status from "../components/book/Status.jsx";

AWS.config.region = "us-east-2";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-2:7dc220ca-2c98-428d-86c2-83fa56c53ebd"
});


export async function getServerSideProps(context) {
  const lambda = new AWS.Lambda();
  const tripId = context.params.id;
  const email = JSON.parse(context.headers['e-amzn-oidc-data']).email;

  const params1 = {
    FunctionName: 'foundtripdetail-dev',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({ tripId: `${tripId}`})
  };

  const params2 = {
    FunctionName: 'foundtripbookcheck-dev',
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

  let trip;
  let booked;
  try {// await the Lambda invocat
    [trip, booked] = await Promise.all([lambdaPromise1,lambdaPromise2]);
  } catch (err) {
    console.error("Failed to fetch trips", err);
    trip = null;
  }
  return { props: { trip,booked} }
}



const EventDetailPage = ({trip}) => {
  console.log({trip})
  trip = JSON.parse(trip.Payload).body[0];
  const description = trip.description.split("&").map(line => <p>{line}</p>);

  const [confirm,setConfirm] = useState(false);
  const [booked,setBooked] = useState(false);
  // const [status,setStatus] = useState(false);
  

  // const {id} = useParams();
  
  // useEffect(()=>{
  //   const loadTrip = async() => {
  //     try{
  //       const tripInfo = await axios.get(`/trips/${id}`);
  //       // console.log(tripInfo)
  //       setTrip(tripInfo.data);
  //       const booked = await axios.get(`/trips/book/${id}/${props.user.id}`);
  //       if (booked.data == "TRUE")  setBooked(true);
  //       // return booked.rows
  //     } catch(err){
  //       console.log(err.message);
  //     }
  //   };

    // const isBooked = async() => {
    //   try{
        
    //     console.log(booked);
    //   } catch(err){
    //     console.log(err.message);
    //   }
    // }
  //   loadTrip();

  // },[]);
   


  // const bookTrip = async(e) => {
  //   e.preventDefault();
  //   try{
  //     console.log("clicked")
  //     const response = await axios.post("/trips/book",{
  //       tripId:trip.id,
  //       userId:props.user.id
  //     });
  //     console.log(response);
  //     setStatus(true);
  //     setConfirm(false);
  //     setBooked(true);
      
      //why is the line below not printed?
  //   } catch(err){
  //     console.log(err.message);
  //   }
  // }



  return(
    <>
   <h4>{trip.title}</h4>
    {description}
    {trip.start_time}
    {trip.end_time}
    {trip.total_spots}
    {trip.available_spots}

    <button onClick={()=>{setConfirm(true)}}>Book</button>
    {confirm && <Confirm book={bookTrip} back={()=>{setConfirm(false)}}/> }

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
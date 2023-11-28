import AWS from 'aws-sdk';
AWS.config.region = "us-east-2";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-2:7dc220ca-2c98-428d-86c2-83fa56c53ebd"
});
const lambda = new AWS.Lambda();


export async function getAllTrips() {
  const params = {
    FunctionName: 'foundtrips-dev',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({ key1: 'value1', key2: 'value2' })
  };
  try{
    const res = await lambda.invoke(params).promise();
    return JSON.parse(res.Payload).body;
  } catch (err) {
    console.error("Error invoking Lambda function", err);
    throw err;
  }
}


export async function getAllBookings(){
  const params = {
    FunctionName: 'foundallbookings-dev',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({ key1: 'value1', key2: 'value2' })
  };
  try{
    const res = await lambda.invoke(params).promise();
    return JSON.parse(res).PayLoad.body;
  } catch (err) {
    console.error("Error invoking Lambda function", err);
    throw err;
  }
}

export async function getTripDetails(email,tripId) {
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
  try{
    const trip = await lambda.invoke(params1).promise();
    const is_booked = await lambda.invoke(params2).promise();
    return {trip,is_booked};
  } catch(err){
    console.error("Error invoking Lambda function", err);
    throw err;
  }
}
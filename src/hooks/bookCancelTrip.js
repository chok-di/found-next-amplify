import AWS from 'aws-sdk';
AWS.config.region = "us-east-2";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-2:7dc220ca-2c98-428d-86c2-83fa56c53ebd"
});
const lambda = new AWS.Lambda();

export async function bookTrip(email,tripId){
  const params = {
    FunctionName: 'foundBookTrip-dev',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({  email: `${email}`,tripId: `${tripId}`})
  };
  try{
    const res = await lambda.invoke(params).promise();
    return JSON.parse(res.Payload);
  } catch (err) {
    console.error("Error invoking Lambda function", err);
    throw err;
  }
}

export async function canceltrip(email, tripId){
  const params = {
    FunctionName: 'foundcanceltrip-dev',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({  email: `${email}`,tripId: `${tripId}`})
  };
  try{
    const res = await lambda.invoke(params).promise();
    return JSON.parse(res.Payload);
  } catch (err) {
    console.error("Error invoking Lambda function", err);
    throw err;
  }


}
import AWS from 'aws-sdk'
AWS.config.region = 'us-east-2'
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-2:7dc220ca-2c98-428d-86c2-83fa56c53ebd',
})
const lambda = new AWS.Lambda()

export const bookTrip = async (email: string, tripId: number) => {
  const params = {
    FunctionName: 'foundBookTrip-dev',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({ email: `${email}`, tripId: `${tripId}` }),
  }
  try {
    await lambda.invoke(params).promise()
  } catch (err) {
    return err
  }
}

export const canceltrip = async (email: string, tripId: number) => {
  const params = {
    FunctionName: 'foundcanceltrip-dev',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({ email: `${email}`, tripId: `${tripId}` }),
  }
  try {
    await lambda.invoke(params).promise()
  } catch (err) {
    return err
  }
}

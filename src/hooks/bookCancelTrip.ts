import AWS from 'aws-sdk'
AWS.config.region = 'us-east-2'
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-2:7dc220ca-2c98-428d-86c2-83fa56c53ebd',
})
const lambda = new AWS.Lambda()

export const bookTrip = async (
  email: string,
  tripId: number,
): Promise<void> => {
  const params = {
    FunctionName: 'foundBookTrip-dev',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({ email: `${email}`, tripId: `${tripId}` }),
  }
  try {
    await lambda.invoke(params).promise()
  } catch (err) {
    console.error('Error invoking Lambda function foundBookTrip-dev', err)
    throw err
  }
}

export const canceltrip = async (
  email: string,
  tripId: number,
): Promise<void> => {
  const params = {
    FunctionName: 'foundcanceltrip-dev',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({ email: `${email}`, tripId: `${tripId}` }),
  }
  try {
    await lambda.invoke(params).promise()
  } catch (err) {
    console.error('Error invoking Lambda function foundcanceltrip-dev', err)
    throw err
  }
}

import AWS from 'aws-sdk'
import { type InvocationResponse } from 'aws-sdk/clients/lambda'

AWS.config.region = 'us-east-2'
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-2:7dc220ca-2c98-428d-86c2-83fa56c53ebd'
})
const lambda = new AWS.Lambda()

interface Trip {
  id: number
  title: string
  total_spots: number
  available_spots: number
  start_time: string // timestamp: "2023-12-28T07:00:00.000Z",
  end_time: string // timestamp: "2024-01-16T20:00:00.000Z",
  price: number
  description: string
}

interface Booking {
  id: number
  trip_id: number
  email: string
}

export const getAllTrips = async (): Promise<Trip[]> => {
  const params = {
    FunctionName: 'foundtrips-dev',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({ key1: 'value1', key2: 'value2' })
  }
  try {
    const res: InvocationResponse = await lambda.invoke(params).promise()
    if (res.Payload === undefined) {
      console.error('Lambda response or Payload is undefined')
      throw new Error('Lambda response or Payload is undefined')
    }
    if (typeof res.Payload !== 'string') {
      console.error('Expected Payload to be a string', res.Payload)
      throw new Error('Expected Payload to be a string')
    }
    return JSON.parse(res.Payload).body
  } catch (err) {
    console.error('Error invoking Lambda function', err)
    throw err
  }
}

export const getAllBookings = async (): Promise<Booking[]> => {
  const params = {
    FunctionName: 'foundallbookings-dev',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({ key1: 'value1', key2: 'value2' })
  }
  try {
    const res: InvocationResponse = await lambda.invoke(params).promise()
    if (res.Payload === undefined) {
      console.error('Lambda response or Payload is undefined')
      throw new Error('Lambda response or Payload is undefined')
    }
    if (typeof res.Payload !== 'string') {
      console.error('Expected Payload to be a string', res.Payload)
      throw new Error('Expected Payload to be a string')
    }
    return JSON.parse(res.Payload).body
  } catch (err) {
    console.error('Error invoking Lambda function', err)
    throw err
  }
}

export const getTripDetails = async (
  email: string,
  tripId: number
): Promise<{ trip: Trip, isBooked: boolean }> => {
  const params1 = {
    FunctionName: 'foundtripdetail-dev',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({ tripId: `${tripId}` })
  }
  const params2 = {
    FunctionName: 'foundtripcheckbooked-dev',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({ tripId: `${tripId}`, email: `${email}` })
  }
  try {
    const resTrip = await lambda.invoke(params1).promise()
    if (resTrip.Payload === undefined) {
      console.error('Lambda response or Payload is undefined')
      throw new Error('Lambda response or Payload is undefined')
    }
    if (typeof resTrip.Payload !== 'string') {
      console.error('Expected Payload to be a string', resTrip.Payload)
      throw new Error('Expected Payload to be a string')
    }
    const trip: Trip = JSON.parse(resTrip.Payload).body[0]

    const resIsBooked = await lambda.invoke(params2).promise()
    if (resIsBooked.Payload === undefined) {
      console.error('Lambda response or Payload is undefined')
      throw new Error('Lambda response or Payload is undefined')
    }
    if (typeof resIsBooked.Payload !== 'string') {
      console.error('Expected Payload to be a string', resIsBooked.Payload)
      throw new Error('Expected Payload to be a string')
    }
    const isBooked: boolean = JSON.parse(resIsBooked.Payload)

    return { trip, isBooked }
  } catch (err) {
    console.error('Error invoking Lambda function', err)
    throw err
  }
}

// let is_booked = JSON.parse(data.is_booked.Payload);
// let trip = JSON.parse(data.trip.Payload).body[0];

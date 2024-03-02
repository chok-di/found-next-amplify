import React from 'react'
import { type GetServerSideProps } from 'next'

import TripCard from '../app/components/TripCard'
import { getUser } from '../hooks/checkUserGetEmail'
import { getAllTrips, getAllBookings } from '../hooks/getTripInfo'

import Layout from '../app/components/Layout'

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

interface Props {
  trips: Trip[]
  bookings: Booking[]
  email: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const token = context.req.cookies.userToken
  const user = await getUser(token)
  let email = ''
  if (user?.email !== undefined) {
    email = user.email
  }
  let trips: Trip[] = []
  let bookings: Booking[] = []
  try {
    trips = await getAllTrips()
    bookings = await getAllBookings()
  } catch (err) {
    console.error('Failed to fetch trips', err)
  }
  return { props: { trips, bookings, email } }
}

const BookEventPage: React.FC<Props> = ({
  trips,
  bookings,
  email,
}): JSX.Element => {
  const bookingsInformation = bookings
  const tripInformation = trips.map((trip, index) => {
    const bookedUser = bookingsInformation
      .filter((booking) => booking.trip_id === trip.id)
      .map((booking) => booking.email)

    const isFull = bookedUser.length === trip.total_spots
    const isBooked = bookedUser.includes(email)
    const start = new Date(trip.start_time).toLocaleString()
    const end = new Date(trip.end_time).toLocaleString()

    return (
      <div key={index} className=" flex flex-col justify-center align-center">
        <TripCard
          trip={trip}
          id={trip.id}
          title={trip.title}
          start_time={start}
          end_time={end}
          isFull={isFull}
          isBooked={isBooked}
        />
      </div>
    )
  })

  return (
    <Layout>
      {tripInformation}

      {/* <Scheduler/> */}
    </Layout>
  )
}

export default BookEventPage

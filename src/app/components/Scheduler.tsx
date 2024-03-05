'use client'

import React, { useState } from 'react'
import Calendar from 'react-calendar'
import Link from 'next/link'

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

const Scheduler = ({ events }: { events: Trip[] }): JSX.Element => {
  const firstEvent = events[0]
  const [displayEvent, setEvent] = useState(firstEvent)

  interface Tile {
    activeStartDate: Date
    date: Date
    view: string
  }

  const highlightEventDays = (date: Tile): string => {
    console.log(date)
    for (const event of events) {
      const startDate = new Date(event.start_time).setHours(0, 0, 0, 0)
      const endDate = new Date(event.end_time).setHours(0, 0, 0, 0)
      const eachDay = date.date.setHours(0, 0, 0, 0)
      if (eachDay > startDate && eachDay < endDate) {
        return `eventDays event_${event.id}`
      }
      if (eachDay === startDate) {
        return 'eventStartDay eventDays'
      }
      if (eachDay === endDate) {
        return 'eventEndDay eventDays'
      }
    }
    return ''
  }

  const handleTileClick = (date: Date): void => {
    const event = events.filter(
      (event) =>
        new Date(event.start_time) <= date && new Date(event.end_time) >= date
    )[0]
    setEvent(event)
    // console.log('even set:' + event)
    
  }

  const activities = displayEvent.description.split('&').map((activity,index) => {
    return <div key={index}> &#8226; {activity}</div>
  })

  return (
    <div className="flex flex-row pb-24">
      <div className="mx-24 w-1/2">
        <Calendar
          value={new Date(2023, 0, 1)}
          tileClassName={highlightEventDays}
          onClickDay={handleTileClick}
          maxDate={new Date(2025, 3, 1)}
          minDate={new Date()}
          minDetail={'month'}
        />
      </div>
      <div className="mx-8 w-1/2 font-mono">
        <div className="font-semibold">{displayEvent.title} </div>
        <div className="font-semibold">
          {new Date(displayEvent.start_time).toLocaleDateString()} to{' '}
          {new Date(displayEvent.end_time).toLocaleDateString()}{' '}
        </div>
        <div>
          <span className="font-semibold">
            {displayEvent.available_spots} spots left
          </span>{' '}
          ({displayEvent.total_spots} spots total)
        </div>
        <div>
          From{' '}
          <span className="font-semibold">${displayEvent.price} (CAD)</span>
        </div>
        <br />
        <span className="font-semibold"> What's included:</span>
        {activities}
        <Link href={'#'}>
          <button className="bg-ocean text-white font-mono font-semibold w-24 h-8">
            Book
          </button>
        </Link>
      </div>
    </div>
  )
}
export default Scheduler

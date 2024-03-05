import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Props{
  id: number
  title: string
  start: string
  end: string
  isFull: boolean
  isBooked: boolean
}


const TripCard: React.FC<Props> = ({ id,title, start, end, isFull, isBooked}): JSX.Element => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-row w-[80rem] my-10 justify-around shadow-[2px_4px_4px_4px_rgba(0,0,0,0.4)]">
        <div className="mt-8">
          <h3 className="mb-8 font-serif font-semibold text-2xl">
            {title}
          </h3>
          <p className="font-mono">From:&nbsp;{start}</p>
          <p className="font-mono">
            To:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{end}
          </p>
          <div className="font-mono py-8">
            {!isFull && !isBooked && (
              <Link href={`/trip/${id}`}>
                <button className="w-20 h-8 mr-4  bg-ocean text-white text-center">
                  Book
                </button>
              </Link>
            )}
            {isFull && <button>Full</button>}
            {isBooked && (
              <button className="w-20 h-8 mr-4 bg-ocean text-white text-center">
                Booked
              </button>
            )}
            <Link href={`/trip/${id}`}>
              <button className="w-20 h-8 bg-ocean text-white text=center">
                Details
              </button>
            </Link>
          </div>
        </div>
        <div className="pt-8">
          <Image alt="image" width={220} height={150} src={'/img/a1.jpg'} />
        </div>
      </div>
    </div>
  )
}

export default TripCard

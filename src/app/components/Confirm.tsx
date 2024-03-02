'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { bookTrip, canceltrip } from '../../hooks/bookCancelTrip'
import Link from 'next/link'

interface Props {
  isBooked: boolean
  isFull: boolean
  email: string
  tripId: number
}
export const Confirm: React.FC<Props> = ({
  isBooked,
  isFull,
  email,
  tripId,
}): JSX.Element => {
  // const { isBooked, is_full, email, tripId } = props
  const [status, setStatus] = useState('')
  const router = useRouter()

  const handleBook = async () => {
    try {
      setStatus('waiting')
      await bookTrip(email, tripId)
      setStatus('complete')
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancel = async () => {
    try {
      setStatus('waiting')
      await canceltrip(email, tripId)
      setStatus('complete')
    } catch (err) {
      console.log(err)
    }
  }

  let handler, message
  switch (status) {
    case 'book':
      handler = handleBook
      message = 'confirm booking?'
      break
    case 'cancel':
      handler = handleCancel
      message = 'Cancel booking?'
      break
    case 'waiting':
      message = 'waiting'
      break
    case 'complete':
      message = 'Action complete.'
      break
  }

  return (
    <div className="">
      {isBooked && (
        <div className="flex space-x-8">
          <button className="bg-ocean hover:bg-deep-ocean text-white px-4 py-2 w-18 rounded">
            {' '}
            Booked{' '}
          </button>
          <button
            className="bg-ocean hover:bg-blue-600 text-white px-4 py-2 w-18 rounded"
            onClick={() => {
              setStatus('cancel')
            }}
          >
            {' '}
            Cancel
          </button>
        </div>
      )}
      {!isFull && !isBooked && email && (
        <button
          onClick={() => {
            setStatus('book')
          }}
        >
          Book
        </button>
      )}
      {!isFull && !isBooked && !email && (
        <button className="bg-ocean hover:bg-deep-ocean text-white px-4 py-2 w-18 rounded">
          <Link href={'/auth'}>LogIn</Link>
        </button>
      )}
      {isFull && <button>Full</button>}

      {status && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-sand text-black border-2 p-4 rounded-md w-[40rem] h-[15rem] flex flex-col items-center">
              <h1 className="font-mono text-3xl mt-8 mb-8">{message}</h1>
              {(status == 'book' || status == 'cancel') && (
                <div className="flex space-x-16">
                  <button
                    className="bg-ocean hover:bg-blue-600 text-white p-2 w-16 rounded"
                    onClick={handler}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-ocean hover:bg-red-600 text-white p-2 w-16 rounded"
                    onClick={() => {
                      setStatus('')
                    }}
                  >
                    No
                  </button>
                </div>
              )}
              {status == 'complete' && (
                <button
                  className=" bg-ocean hover:bg-red-600 text-white p-2 w-16 rounded"
                  onClick={void router.reload()}
                >
                  back
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Confirm

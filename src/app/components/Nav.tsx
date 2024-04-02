'use client'

import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { getUser, signOut } from '../../hooks/checkUserGetEmail'
import Link from 'next/link'
import Cookies from 'js-cookie'

interface CognitoUser {
  aud: string
  auth_time: number
  'cognito:username': string
  email?: string
  email_verified?: boolean
  event_id: string
  exp: number
  family_name: string
  gender: string
  given_name: string
  iat: number
  iss: string
  jti: string
  origin_jti: string
  sub: string
  token_use: string
}

export const Nav = ({ home }: { home?: boolean }): JSX.Element => {
  const [user, setUser] = useState<CognitoUser | null>(null)
  const router = useRouter()

  useEffect(() => {
    const setUserData = async () => {
      try {
        const token = Cookies.get('userToken')
        const user = await getUser(token)
        if (user !== undefined) {
          setUser(user)
        }
      } catch (err) {
        return err
      }
    }

    const handleScroll = (): void => {
      const navbar = document.getElementById('navbar')
      if (window.scrollY > 0 && navbar !== null) {
        navbar.classList.add('bg-ocean-light', 'opacity-95')
      } else if (navbar !== null) {
        navbar.classList.remove('bg-ocean-light', 'opacity-95')
      }
    }

    void setUserData()
    window.addEventListener('scroll', handleScroll)
  }, [])

  const navStyle = home
    ? 'fixed w-full h-28 m-0 p-0 flex flex-row items-center bg-transparent text-white z-10 '
    : 'm-0 p-0 flex flex-row bg-ocean text-white z-10 h-30'

  return (
    <nav className={navStyle} id="navbar">
      {/* left */}
      <div className=" ml-24 basis-1/4 text-[2em] font-serif">FOUND.</div>
      {/* right */}
      <div className=" basis-3/4 text-[1.3em] font-mono flex flex-row items-center justify-end">
        <div className="mr-8 "> About </div>
        <div className="mr-8"> Corporate Retreats</div>
        <div className="mr-8"> 中文 </div>
        <div className="mr-8">
          {user !== null && (
            <button className="border-2 w-24 h-12">
              {' '}
              <Link href="/auth">Log In</Link>{' '}
            </button>
          )}
          {user !== null && (
            <div className="dropdown w-24 relative ">
              <button className="dropbtn w-24 h-12 flex justify-center items-center">
                {user.given_name}&nbsp;
                <FontAwesomeIcon icon={faCircleChevronDown} size="2xs" />
              </button>
              <div className="dropdown-content">
                <div>
                  <Link href="/trips">Trips</Link>
                </div>
                <div>My Bookings</div>
                <div>
                  <button
                    onClick={() => {
                      signOut().then(() => {
                        router.reload()
                      })
                    }}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Nav

// import {useEffect, useState} from 'react';
import { getUser } from './checkUserGetEmail.js'
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

const useFetchUser = async (): Promise<CognitoUser | undefined> => {
  const token = Cookies.get('userToken')
  const fetchedUser = await getUser(token)
  return fetchedUser
}
export default useFetchUser

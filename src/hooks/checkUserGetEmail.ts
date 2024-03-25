import Cookies from 'js-cookie'
import { Auth } from 'aws-amplify'

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

export const saveToken = (token: string): void => {
  Cookies.set('userToken', token)
}

export const getUser = async (
  token: string | undefined
): Promise<CognitoUser | undefined> => {
  const response = await fetch('http://localhost:3000/api/user', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  if (response.ok) {
    const data = await response.json()
    return data.decoded
  } else {
    throw Error('Failed to get User')
  }
}

export const signOut = async (): Promise<void> => {
  Cookies.remove('userToken')
  await Auth.signOut()
}

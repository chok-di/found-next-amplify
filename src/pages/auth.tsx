'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Amplify, Auth, Hub } from 'aws-amplify'
import awsmobile from '../aws-exports.js'
import { Authenticator } from '@aws-amplify/ui-react'

import '@aws-amplify/ui-react/styles.css'

import { saveToken } from '@/hooks/checkUserGetEmail'

import Layout from '../app/components/Layout'

Amplify.configure(awsmobile)

export const AuthPage = (): JSX.Element => {
  const router = useRouter()
  // redirect to the page before
  const handleLogIn = async (): Promise<void> => {
    const storedValue = localStorage.getItem('previousPath')
    const previousPath =
      storedValue !== null && storedValue !== '' ? storedValue : '/'
    localStorage.removeItem('previousPath')
    await router.push(previousPath)
    router.reload()
  }

  useEffect(() => {
    if (document.referrer !== '') {
      const previousPath = new URL(document.referrer).pathname
      localStorage.setItem('previousPath', previousPath)
    }

    const getUserAndSendToken = async (): Promise<void> => {
      try {
        const user = await Auth.currentAuthenticatedUser()
        const token: string = user.signInUserSession.idToken.jwtToken
        saveToken(token)
      } catch (err) {
        throw err
      }
    }
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        // sign out from user side when token expires
        case 'tokenRefresh_failure':
          void Auth.signOut()
          break
        case 'signIn':
        case 'cognitoHostedUI':
          void getUserAndSendToken()
          void handleLogIn()
          break
        case 'signOut':
          void router.push('/')
          break
      }
    })
  }, [])

  return (
    <Layout>
      <Authenticator>
        <button
          onClick={() => {
            const signOut = async (): Promise<void> => {
              await Auth.signOut()
            }
            void signOut()
          }}
        >
          Sign out
        </button>
      </Authenticator>
    </Layout>
  )
}

export default AuthPage

import React from 'react'
import { type AppProps } from 'next/app'
import { Amplify } from 'aws-amplify'
import awsmobile from '../aws-exports.js'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'

import '../app/globals.css'
import '../app/styles/scheduler.module.css'
config.autoAddCss = false

Amplify.configure({ ...awsmobile, ssr: true })

export const MyApp: React.FC<AppProps> = ({
  Component,
  pageProps
}: AppProps) => {
  return <Component {...pageProps} />
}

export default MyApp

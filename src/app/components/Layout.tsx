import React from "react";
import Head from 'next/head';
// import Image from 'next/image';
// import styles from './layout.module.css';
// import utilStyles from '../styles/utils.module.css';
// import Link from 'next/link';
const name = 'Woody';
const siteTitle = 'Next.js Sample Website';

import { Marcellus, Jost, Inter } from 'next/font/google';


const marcellus = Marcellus({
  subsets:['latin'],
  weight:['400'],
  variable:'--font-marcellus',
})

const jost = Jost({
  subsets:['latin'],
  weight:['600','400'],
  variable:'--font-jost',
})

const inter = Inter({
  subsets:['latin'],
  weight:['400'],
  variable:'--font-inter'
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  // home?: boolean
}) {
  return (
    <main className={`${marcellus.variable} ${jost.variable} ${inter.variable}`}>
    <html lang="en">
      <Head>
        <link rel='icon' href='/favicon.ico'/>
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(siteTitle,)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        {children}
      </body>
    </html>
    </main>
  )
}

import React from "react";
import Head from 'next/head';
// import Image from 'next/image';
// import styles from './layout.module.css';
// import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
const name = 'Woody';
const siteTitle = 'Next.js Sample Website';

import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";

//font awesome


import { Marcellus, Jost, Inter } from 'next/font/google';


const marcellus = Marcellus({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-marcellus',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['600', '400'],
  variable: '--font-jost',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-inter'
})


export default function RootLayout({
  children, home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <main className={`${marcellus.variable} ${jost.variable} ${inter.variable}`}>
      <html lang="en">
        <Head>
          <link rel='icon' href='/favicon.ico' />
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
        <body className="relative">
          {home ? (
            
              <div className="relative z-10 overflow-y-hidden">
                <div className="absolute top-0 left-0 w-full h-[700px] bg-cover bg-[url('../img/background.jpg')]">
                  <Nav />
                  <span><h1 className="ml-24 pt-48 text-7xl font-serif text-white ">Let's Thrive Together.</h1></span>
                  <div>
                    <Link href="/trips">
                      <button
                        className="ml-24 mt-24 mb-24 font-mono font-semibold text-ocean bg-white w-40 h-10 shadow-[2px_4px_4px_4px_rgba(0,0,0,0.4)]">
                        Book Now &#8594;
                      </button>
                    </Link>
                  </div>
                </div>
                {children}
                <Footer />
              </div>
            


          ) : (
            <>
              <Nav />
              {children}
              <Footer />
            </>

          )}
        </body>
      </html>
    </main>
  )
}

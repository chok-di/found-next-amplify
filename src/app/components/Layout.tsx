import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from './Nav'
import Footer from './Footer'
import { Marcellus, Jost, Inter } from 'next/font/google'


const siteTitle = 'Next.js Sample Website'


// font awesome

const marcellus = Marcellus({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-marcellus'
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['600', '400'],
  variable: '--font-jost'
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-inter'
})

export const RootLayout = ({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}): JSX.Element => {
  return (
    <main
      className={`${marcellus.variable} ${jost.variable} ${inter.variable}`}
    >
      <html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(siteTitle)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <body className="relative">
          (home !== null && home !== false) ? (
            <div className="relative z-10 overflow-y-hidden">
              <div className="relative bg-cover m-0 p-0 w-full h-[50rem] bg-[url('/img/background.jpg')]">
                <Nav home />
                <h1 className="absolute top-60 left-24  text-7xl font-serif text-white ">
                  Let's Thrive Together.
                </h1>
                <Link className="absolute top-96 left-24" href="/trips">
                  <button className="mt-24 font-mono font-semibold text-ocean bg-white w-44 h-16 text-xl shadow-[2px_4px_4px_4px_rgba(0,0,0,0.4)]">
                    Book Now &#8594;
                  </button>
                </Link>
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
          )
        </body>
      </html>
    </main>
  )
}

export default RootLayout
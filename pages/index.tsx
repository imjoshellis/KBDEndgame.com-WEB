import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import RegularPageLayout from '../src/layouts/RegularPageLayout'

export const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>KBD Endgame - Home</title>
      </Head>

      <RegularPageLayout hideBreadCrumbs>
        <h1 className='text-3xl'>Welcome to KBD Endgame!</h1>
        <Link href='/kbd'>
          <a className='m-2 text-link-500'>View All Keyboards</a>
        </Link>
        <Link href='/login'>
          <a className='text-link-500'>Click here to Login or Sign Up</a>
        </Link>
      </RegularPageLayout>
    </>
  )
}

export default Home

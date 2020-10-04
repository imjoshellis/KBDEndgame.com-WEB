import { formatDistanceToNow, toDate } from 'date-fns'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import slugid from 'slugid'
import { useAuth } from '../../src/context/auth/AuthProvider'
import { useKeyboardsQuery } from '../../src/generated/graphql'
import RegularPageLayout from '../../src/layouts/RegularPageLayout'
import { createUrqlClient } from '../../src/util/createUrqlClient'

export const AllKeyboards: NextPage = () => {
  const { user } = useAuth()
  const [
    { data: { keyboards } = { keyboards: undefined } }
  ] = useKeyboardsQuery({ requestPolicy: 'cache-and-network' })

  return (
    <>
      <Head>
        <title>KBD Endgame - All Keyboards</title>
      </Head>

      <RegularPageLayout>
        <div className='grid w-full grid-cols-1 gap-4'>
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-medium'>Keyboards</h1>
            {user ? (
              <Link href='/add-keyboard'>
                <a className='p-4 py-2 text-sm font-medium tracking-wider uppercase transition-colors duration-200 rounded bg-link-600 hover:bg-link-400 text-link-100 hover:text-link-50 hover:no-underline'>
                  add new
                </a>
              </Link>
            ) : null}
          </div>
          {keyboards
            ? keyboards.map(kbd => {
                const slug = slugid.encode(kbd.id)
                const relativeUpdatedAt = formatDistanceToNow(
                  toDate(parseInt(kbd.updatedAt))
                )
                return (
                  <Link key={kbd.id} href={`/kbd/${slug}`}>
                    <div className='flex flex-col flex-grow overflow-hidden transition-colors duration-300 ease-in border-2 rounded cursor-pointer border-surface-700 bg-surface-800 hover:bg-link-900 hover:border-link-400 hover:ease-out'>
                      {kbd.image ? (
                        <div className='relative pb-1/2'>
                          <img
                            src={kbd.image}
                            alt={kbd.title + ' image'}
                            className='absolute object-cover w-full h-full rounded-b-sm'
                          />
                        </div>
                      ) : null}
                      <div className='p-4 py-2'>
                        <div className='flex flex-wrap items-baseline justify-between'>
                          <div className='flex flex-wrap items-baseline flex-grow'>
                            <h2 className='text-xl font-medium'>{kbd.title}</h2>
                            <h3 className='ml-1'>
                              by{' '}
                              <Link href={`/u/${kbd.user.username}`}>
                                <a className='text-link-500'>
                                  {kbd.user.username}
                                </a>
                              </Link>
                            </h3>
                          </div>
                          <p className='text-sm text-surface-300'>
                            updated {relativeUpdatedAt} ago
                          </p>
                        </div>
                        <p>{kbd.description}</p>
                      </div>
                    </div>
                  </Link>
                )
              })
            : 'Loading, please wait...'}
        </div>
      </RegularPageLayout>
    </>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(AllKeyboards)

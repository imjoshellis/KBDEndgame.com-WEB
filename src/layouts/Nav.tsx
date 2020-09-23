import { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth/AuthProvider'

export const Nav: NextPage = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()

  const toggleIsOpen = () => setIsOpen(!isOpen)

  useEffect(() => {
    user ? setLoggedIn(true) : setLoggedIn(false)
  }, [user])

  const navlink =
    'text-lg lg:text-base text-surface-200 transition-all duration-300 ease-in hover:ease-out hover:text-link-500'
  const navlogin =
    'uppercase text-sm px-3 py-1 tracking-wider border border-link-700 text-link-500 rounded transition-all duration-200 ease-in hover:ease-out hover:text-link-100 hover:bg-link-500'
  const navlogout =
    'uppercase text-sm px-3 py-1 tracking-wider border border-surface-500 text-surface-200 hover:border-link-500 rounded transition-all duration-200 ease-in hover:ease-out hover:text-link-100 hover:bg-link-500'
  return (
    <header className='sticky top-0 z-50 flex flex-col items-center justify-between py-4 mb-4 shadow-xl lg:flex-row bg-surface-900'>
      <div className='flex justify-between w-full mb-2 text-xl font-medium'>
        <Link href='/'>
          <a>KBD Endgame</a>
        </Link>
        <div className='lg:hidden'>
          <button className={navlogin} onClick={toggleIsOpen}>
            {isOpen ? 'Close' : 'Open'} Menu
          </button>
        </div>
      </div>
      <nav role='navigation' aria-labelledby='mainmenulabel' className='w-full'>
        <h2 className='visually-hidden' id='mainmenulabel'>
          Main Menu
        </h2>
        <div
          role='navigation'
          id='smallNav'
          className='flex items-center lg:hidden'
        >
          <div
            className={
              isOpen
                ? 'grid grid-cols-1 gap-2 w-full text-left'
                : 'visually-hidden'
            }
          >
            <Link href='/kbd'>
              <a className={navlink}>keyboards</a>
            </Link>
            {loggedIn ? (
              <Link href='/account'>
                <a className={navlink}>{user?.username} (you)</a>
              </Link>
            ) : null}
            {loggedIn ? (
              <Link href='/logout'>
                <a className={navlogout}>logout</a>
              </Link>
            ) : (
              <Link href='/login'>
                <a className={navlogin}>login</a>
              </Link>
            )}
          </div>
        </div>
        <div className='flex'>
          <div className='flex-grow' />
          <div
            role='navigation'
            id='bigNav'
            className='items-center hidden grid-flow-col gap-4 lg:grid'
          >
            <Link href='/kbd'>
              <a className={navlink}>keyboards</a>
            </Link>
            {loggedIn ? (
              <Link href='/account'>
                <a className={navlink}>{user?.username} (you)</a>
              </Link>
            ) : null}
            {loggedIn ? (
              <Link href='/logout'>
                <a className={navlogout}>logout</a>
              </Link>
            ) : (
              <Link href='/login'>
                <a className={navlogin}>login</a>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Nav

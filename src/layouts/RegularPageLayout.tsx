import { NextPage } from 'next'
import React from 'react'
import BreadCrumbs from './BreadCrumbs'
import Main from './Main'
import Nav from './Nav'

export const RegularPageLayout: NextPage<{ hideBreadCrumbs?: boolean }> = ({
  children,
  hideBreadCrumbs = false
}) => {
  return (
    <div className='px-4 mb-8 lg:px-0 lg:mx-auto lg:max-w-3xl'>
      <Nav />
      {!hideBreadCrumbs && <BreadCrumbs />}
      <Main>{children}</Main>
    </div>
  )
}

export default RegularPageLayout

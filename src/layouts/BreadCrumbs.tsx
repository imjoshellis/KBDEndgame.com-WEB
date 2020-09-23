import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface BreadCrumbsProps {}

export const BreadCrumbs: React.FC<BreadCrumbsProps> = () => {
  const router = useRouter()
  const routeMap = new Map([
    ['[slug]', 'keyboard'],
    ['kbd', 'keyboards']
  ])

  const getCrumbDisplay = (crumbText: string) =>
    routeMap.has(crumbText) ? routeMap.get(crumbText) : crumbText

  const getCrumbRoute = (crumbText: string) =>
    crumbText === '[slug]' ? router.query.slug : crumbText

  const crumbs = router.route
    .split('/')
    .filter(crumb => crumb.trim() !== '')
    .map(crumbText => ({
      route: getCrumbRoute(crumbText),
      display: getCrumbDisplay(crumbText)
    }))

  const separator = <span className='text-surface-400'> › </span>

  const isLast = (idx: number) => idx !== crumbs.length - 1

  const crumbLink = (idx: number) =>
    '/' +
    crumbs
      .filter((_, _idx) => _idx <= idx)
      .map(crumb => crumb.route)
      .join('/')

  return (
    <div className='mb-4 text-sm text-surface-200'>
      <Link href='/'>
        <a>home</a>
      </Link>{' '}
      {router.route === '/' ? null : separator}
      {crumbs.map((crumb, idx) => (
        <span key={idx}>
          <Link href={crumbLink(idx)}>
            <a>{crumb.display}</a>
          </Link>{' '}
          {isLast(idx) ? separator : null}
        </span>
      ))}
    </div>
  )
}

export default BreadCrumbs

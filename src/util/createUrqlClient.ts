import { devtoolsExchange } from '@urql/devtools'
import { cacheExchange } from '@urql/exchange-graphcache'
import { dedupExchange, fetchExchange, subscriptionExchange } from 'urql'
import { LogoutMutation, MeDocument, MeQuery } from '../generated/graphql'
import { betterUpdateQuery } from './betterUpdateQuery'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { isServer } from './isServer'

const subscriptionClient = !isServer()
  ? new SubscriptionClient('ws://localhost:4000/graphql', {
      reconnect: true
    })
  : undefined

export const createUrqlClient = (ssrExchange: any) => {
  const exchanges = [
    devtoolsExchange,
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              {
                query: MeDocument
              },
              _result,
              () => ({
                me: null
              })
            )
          }
        }
      }
    }),
    ssrExchange,
    fetchExchange
  ]

  subscriptionClient
    ? exchanges.push(
        subscriptionExchange({
          forwardSubscription (operation) {
            return subscriptionClient.request(operation)
          }
        })
      )
    : null

  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    fetchOptions: {
      credentials: 'include' as const
    },
    exchanges
  }
}

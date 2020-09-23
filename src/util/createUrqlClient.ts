import { devtoolsExchange } from '@urql/devtools'
import { cacheExchange } from '@urql/exchange-graphcache'
import { dedupExchange, fetchExchange } from 'urql'
import { LogoutMutation, MeDocument, MeQuery } from '../generated/graphql'
import { betterUpdateQuery } from './betterUpdateQuery'

export const createUrqlClient = (ssrExchange: any) => ({
  url:
    process.env.NODE_ENV === 'production'
      ? 'https://kbdendgame.herokuapp.com/graphql'
      : 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include' as const
  },
  exchanges: [
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
})

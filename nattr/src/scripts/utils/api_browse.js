import { fetcher } from './api_utils'

export const readUser = username => fetcher({
  method: 'GET',
  url: `/api/account/read/${username}/`
})

export const readMainFeed = username => fetcher({
  method: 'GET',
  url: `/api/account/main_feed/${username}/`
})

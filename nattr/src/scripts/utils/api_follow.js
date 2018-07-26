import { fetcher } from './api_utils'

export const create = id => fetcher({
  method: 'POST',
  url: `/api/account/follow/${id}/`
})

export const destroy = id => fetcher({
  method: 'POST',
  url: `/api/account/unfollow/${id}/`
})

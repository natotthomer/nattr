import { fetcher } from './api_utils'

export const create = data => fetcher({
  method: 'POST',
  url: '/api/post/create/',
  data
})

export const readUserPosts = userId => fetcher({
  method: 'GET',
  url: `/api/post/read_user_posts/${userId}/`
})

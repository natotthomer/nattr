import { fetcher } from './api_utils'

export const signIn = data => fetcher({
  method: 'POST',
  url: '/api/account/sign_in/',
  data
})

export const signUp = data => fetcher({
  method: 'POST',
  url: '/api/account/sign_up/',
  data
})

export const signOut = () => fetcher({
  method: 'POST',
  url: '/api/account/logout/'
})

export const editProfile = (id, data) => fetcher({
  method: 'POST',
  url: `/api/account/edit_profile/${id}/`,
  data
})

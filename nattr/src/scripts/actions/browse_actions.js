import * as API from '../utils/api_browse'
import { RECEIVE_USER, RECEIVE_MAIN_FEED } from '../constants/browse_constants'

const receiveBrowseUser = user => ({
  type: RECEIVE_USER,
  user
})

const receiveMainFeed = feed => ({
  type: RECEIVE_MAIN_FEED,
  feed
})

export const readUser = username => dispatch => {
  return API.readUser(username)
    .then(user => dispatch(receiveBrowseUser(user)))
    .catch(error => console.log(error))
}

export const readMainFeed = username => dispatch => {
  return API.readMainFeed(username)
    .then(response => dispatch(receiveMainFeed(response.feed)))
    .catch(error => console.log(error))
}

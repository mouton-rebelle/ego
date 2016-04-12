import request from 'superagent-bluebird-promise'

const initialState = {
  byId: {
  },
  loading: false
}

// ------------------------------------
// Constants
// ------------------------------------
// loading images
export const IMAGE_LOAD_PENDING = 'IMAGE_LOAD_PENDING'
export const IMAGE_LOAD_FULFILLED = 'IMAGE_LOAD_FULFILLED'
export const IMAGE_LOAD_REJECTED = 'IMAGE_LOAD_REJECTED'

export const IMAGE_CREATE_PENDING = 'IMAGE_CREATE_PENDING'
export const IMAGE_CREATE_FULFILLED = 'IMAGE_CREATE_FULFILLED'
export const IMAGE_CREATE_REJECTED = 'IMAGE_CREATE_REJECTED'

export const IMAGE_UPDATE_PENDING = 'IMAGE_UPDATE_PENDING'
export const IMAGE_UPDATE_FULFILLED = 'IMAGE_UPDATE_FULFILLED'
export const IMAGE_UPDATE_REJECTED = 'IMAGE_UPDATE_REJECTED'

export const createImage = (image) => {
  return {
    action: 'IMAGE_CREATE',
    payload: {
      promise: request.post('/api/images').send(image).promise()
    }
  }
}

export default function images (state = initialState, action) {
  switch (action.type) {
    case IMAGE_LOAD_PENDING:
      return {...state, loading: true}
    case IMAGE_LOAD_FULFILLED:
      console.log(action.payload)
      return state
    case IMAGE_CREATE_FULFILLED:
      console.log(action)
      return state
    default:
      return state
  }
}

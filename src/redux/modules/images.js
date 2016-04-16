import request from 'superagent-bluebird-promise'

const initialState = {
  byId: {
  },
  loading: false,
  overlay: {
    shown: false,
    post: null,
    image: null,
    next: {
      image: null,
      post: null
    },
    prev: {
      image: null,
      post: null
    }
  }
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

export const IMAGE_OVERLAY_SHOW = 'IMAGE_OVERLAY_SHOW'
export const IMAGE_OVERLAY_HIDE = 'IMAGE_OVERLAY_HIDE'

export const IMAGE_OVERLAY_NEXT = 'IMAGE_OVERLAY_NEXT'
export const IMAGE_OVERLAY_PREV = 'IMAGE_OVERLAY_PREV'

export const createImage = (image) => {
  return {
    type: 'IMAGE_CREATE',
    payload: {
      promise: request.post('/api/images').send(image).promise()
    }
  }
}

export const showOverlay = (image) => {
  return {
    type: IMAGE_OVERLAY_SHOW,
    payload: image
  }
}
export const closeOverlay = () => {
  return {
    type: IMAGE_OVERLAY_HIDE,
    payload: null
  }
}
export const actions = {
  createImage,
  showOverlay,
  closeOverlay
}

export default function images (state = initialState, action) {
  switch (action.type) {
    case IMAGE_OVERLAY_SHOW:
      return {
        ...state,
        overlay: {
          ...state.overlay,
          image: action.payload,
          shown: true
        }
      }
    case IMAGE_OVERLAY_HIDE:
      return {
        ...state,
        overlay: {
          ...state.overlay,
          shown: false
        }
      }
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

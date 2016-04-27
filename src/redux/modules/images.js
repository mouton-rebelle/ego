import request from 'superagent-bluebird-promise'
import {forEach as _forEach} from 'lodash'
const initialState = {
  byId: {
  },
  loading: false,
  overlay: {
    shown: false,
    post: null,
    hud: true,
    image: null,
    next: null,
    prev: null
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

export const IMAGE_PREPARE_OVERLAY = 'IMAGE_PREPARE_OVERLAY'
export const IMAGE_OVERLAY_SHOW = 'IMAGE_OVERLAY_SHOW'
export const IMAGE_OVERLAY_HIDE = 'IMAGE_OVERLAY_HIDE'

export const IMAGE_OVERLAY_NEXT = 'IMAGE_OVERLAY_NEXT'
export const IMAGE_OVERLAY_PREV = 'IMAGE_OVERLAY_PREV'
export const IMAGE_OVERLAY_HUD_TOGGLE = 'IMAGE_OVERLAY_HUD_TOGGLE'

function flattenImages (c, images) {
  if (c.image) {
    images.push(c.image)
    return images
  } else {
    if (!c.child) {
      return null
    }
    c.child.forEach((child) => flattenImages(child, images))
    return images
  }
}

export const createImage = (image) => {
  return {
    type: 'IMAGE_CREATE',
    payload: {
      promise: request.post('/api/images').send(image).promise()
    }
  }
}

// prepare the correct data to show overlay, by computing prev & next img
export const prepareOverlay = (image) => {
  return (dispatch, getState) => {
    const state = getState()
    const post = state.posts.bySlug[image.postSlug]
    let prevPost = post
    let nextPost = post
    _forEach(state.posts.byPage, (postsIds) => {
      let count = postsIds.length
      let pos = postsIds.indexOf(post.slug)
      if (pos!==-1) {
        prevPost = state.posts.bySlug[postsIds[pos > 0 ? (pos - 1) : (count - 1)]]
        nextPost = state.posts.bySlug[postsIds[pos < (count - 1) ? (pos + 1) : 0]]
      }
    })
    const postImages = flattenImages(post, [])
    const imagePos = postImages.indexOf(image)
    const countImg = postImages.length
    let prevImg = image
    let nextImg = image
    if (imagePos === 0) {
      const newImages = flattenImages(prevPost, [])
      prevImg = newImages[newImages.length - 1]
    } else {
      prevImg = postImages[imagePos - 1]
    }

    if (imagePos === countImg - 1) {
      const newImages = flattenImages(nextPost, [])
      nextImg = newImages[0]
    } else {
      nextImg = postImages[imagePos + 1]
    }
    dispatch(showOverlay(image, post, prevImg, nextImg))
  }
}
export const toggleHud = () => {
  return {
    type: IMAGE_OVERLAY_HUD_TOGGLE,
    payload: {}
  }
}
export const showOverlay = (image, post, prev, next) => {
  return {
    type: IMAGE_OVERLAY_SHOW,
    payload: {
      image,
      post,
      prev,
      next
    }
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
  prepareOverlay,
  toggleHud,
  closeOverlay
}

export default function images (state = initialState, action) {
  switch (action.type) {
    case IMAGE_OVERLAY_HUD_TOGGLE:
      return {
        ...state,
        overlay: {
          ...state.overlay,
          hud: !state.overlay.hud
        }
      }
    case IMAGE_OVERLAY_SHOW:
      return {
        ...state,
        overlay: {
          ...state.overlay,
          image: action.payload.image,
          next: action.payload.next,
          prev: action.payload.prev,
          post: action.payload.post,
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

import request from 'superagent-bluebird-promise'
import {uniq as _uniq} from 'lodash'

import {FILE_UPLOAD_FULFILLED, FILEQUEUE_LOAD_FULFILLED} from './files'
export const TAG_REMOVE_FOR_REF = 'TAG_REMOVE_FOR_REF'
export const TAG_ADD_FOR_REF = 'TAG_ADD_FOR_REF'
export const TAG_LOAD_PENDING = 'TAG_LOAD_PENDING'
export const TAG_LOAD_REJECTED = 'TAG_LOAD_REJECTED'
export const TAG_LOAD_FULFILLED = 'TAG_LOAD_FULFILLED'

const initialState = {
  all: [],
  loading: false
}
export const loadAllTags = () => {
  return {
    type: 'TAG_LOAD',
    payload: {
      promise: request('/api/tags')
    }
  }
}

// triggers loadAllTags if not currently loading
export const initTags = () => {
  return (dispatch, getState) => {
    if (getState().tags.loading) {
      return
    }
    dispatch(loadAllTags())
  }
}

export const addTagForRef = (tag, ref) => {
  return {
    type: TAG_ADD_FOR_REF,
    payload: {
      ref: ref,
      tag
    }
  }
}

export const removeTagForRef = (tag, ref) => {
  return {
    type: TAG_REMOVE_FOR_REF,
    payload: {
      ref: ref,
      tag
    }
  }
}

export default function tags (state = initialState, action) {
  switch (action.type) {
    case TAG_LOAD_PENDING:
      return {
        ...state,
        loading: true
      }
    case TAG_LOAD_FULFILLED:
      return {
        ...state,
        loading: false,
        all: [...state.all, ...action.payload.body]
      }
    case FILE_UPLOAD_FULFILLED:
    case FILEQUEUE_LOAD_FULFILLED:
      action.payload.body.forEach((f) => {
        state = {
          ...state,
          all: [...state.all, ...f.exif.tags]
        }
      })
      state = {
        ...state,
        all: _uniq(state.all)
      }
      return state
    case TAG_ADD_FOR_REF:
      if (state.all.indexOf(action.payload.tag) === -1) {
        state.all = [...state.all, action.payload.tag]
      }
      return {
        ...state
      }
    default:
      return state
  }
}

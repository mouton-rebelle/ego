import {FILE_UPLOAD_FULFILLED, FILEQUEUE_LOAD_FULFILLED} from './files'
import {uniq as _uniq} from 'lodash'
export const TAG_REMOVE_FOR_REF = 'TAG_REMOVE_FOR_REF'
export const TAG_ADD_FOR_REF = 'TAG_ADD_FOR_REF'

const initialState = {
  all: [],
  assignedToRef: {}
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
    case FILE_UPLOAD_FULFILLED:
    case FILEQUEUE_LOAD_FULFILLED:
      console.log('jusqu')
      action.payload.body.forEach((f) => {
        state = {
          all: [...state.all, ...f.exif.tags],
          assignedToRef: {
            ...state.assignedToRef,
            [`file##${f.filename}`]: f.exif.tags
          }
        }
      })
      state = {
        ...state,
        all: _uniq(state.all)
      }
      return state
    case TAG_ADD_FOR_REF:
      return {
        ...state,
        assignedToRef: {
          ...state.assignedToRef,
          [action.payload.ref]: [...state.assignedToRef[action.payload.ref], action.payload.tag]
        }
      }
    case TAG_REMOVE_FOR_REF:
      const ref = action.payload.ref
      const tag = action.payload.tag
      return {
        ...state,
        assignedToRef: {
          ...state.assignedToRef,
          [ref]: state.assignedToRef[ref].filter((t) => t!==tag)
        }
      }
    default:
      return state
  }
}

import request from 'superagent-bluebird-promise'

// uploading a file
export const FILE_UPLOAD_PENDING = 'FILE_UPLOAD_PENDING'
export const FILE_UPLOAD_FULFILLED = 'FILE_UPLOAD_FULFILLED'
export const FILE_UPLOAD_REJECTED = 'FILE_UPLOAD_REJECTED'

// loading files
export const FILEQUEUE_LOAD_PENDING = 'FILEQUEUE_LOAD_PENDING'
export const FILEQUEUE_LOAD_FULFILLED = 'FILEQUEUE_LOAD_FULFILLED'
export const FILEQUEUE_LOAD_REJECTED = 'FILEQUEUE_LOAD_REJECTED'

export const FILE_HOVER = 'FILE_HOVER'

const initialState = {
  queue: [],
  hover: '',
  selected: []
}

export const loadQueue = function () {
  return {
    type: 'FILEQUEUE_LOAD',
    payload: {
      promise: request('/api/files').promise()
    }
  }
}

export const hoverFile = function (filename) {
  return {
    type: FILE_HOVER,
    payload: {
      filename
    }
  }
}

export const uploadFiles = function (files) {
  let req = request.post('/api/upload')
  files.forEach((file) => {
    req.attach(file.name, file)
  })
  return {
    type: 'FILE_UPLOAD',
    payload: {
      promise: req.promise()
    }
  }
}

export default function files (state = initialState, action) {
  switch (action.type) {
    case FILE_HOVER:
      return {
        ...state,
        hover: action.payload.filename
      }
    case FILE_UPLOAD_FULFILLED:
      return {
        ...state,
        queue: [...state.queue, ...action.payload.body]
      }

    case FILEQUEUE_LOAD_FULFILLED:
      return {
        ...state,
        queue: action.payload.body
      }

    default:
      return state
  }
}
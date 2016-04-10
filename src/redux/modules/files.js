import request from 'superagent-bluebird-promise'

const createAction = (type, payload) => {
  return {
    type, payload
  }
}

// uploading a file
export const FILE_UPLOAD_PENDING = 'FILE_UPLOAD_PENDING'
export const FILE_UPLOAD_FULFILLED = 'FILE_UPLOAD_FULFILLED'
export const FILE_UPLOAD_REJECTED = 'FILE_UPLOAD_REJECTED'

// deleting a file
export const FILE_DELETE_PENDING = 'FILE_DELETE_PENDING'
export const FILE_DELETE_FULFILLED = 'FILE_DELETE_FULFILLED'
export const FILE_DELETE_REJECTED = 'FILE_DELETE_REJECTED'

// loading files
export const FILEQUEUE_LOAD_PENDING = 'FILEQUEUE_LOAD_PENDING'
export const FILEQUEUE_LOAD_FULFILLED = 'FILEQUEUE_LOAD_FULFILLED'
export const FILEQUEUE_LOAD_REJECTED = 'FILEQUEUE_LOAD_REJECTED'

export const FILE_HOVER = 'FILE_HOVER'
export const FILE_SELECTED = 'FILE_SELECTED'
export const FILE_DESELECTED = 'FILE_DESELECTED'

const initialState = {
  queue: [],
  hover: ''
}

export const loadQueue = () => createAction('FILEQUEUE_LOAD', {promise: request('/api/files').promise()})
export const hoverFile = (filename) => createAction(FILE_HOVER, {filename})
export const selectFile = (filename) => createAction(FILE_SELECTED, {filename})
export const deselectFile = (filename) => createAction(FILE_DESELECTED, {filename})

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

export const deleteUploadedFile = function (filename) {
  let req = request.delete(`/api/file/${filename}`)
  return {
    type: 'FILE_DELETE',
    payload: {
      promise: req.promise()
    }
  }
}

export default function files (state = initialState, action) {
  switch (action.type) {
    case FILE_DELETE_FULFILLED:
      delete state.queue[action.payload.body]
      return {...state, queue: {...state.queue}}
    case FILE_SELECTED:
    case FILE_DESELECTED:
      const fna = action.payload.filename
      let file = {...state.queue[fna], selected: action.type === FILE_SELECTED}
      return {...state, queue: {...state.queue, [fna]: file}}
    case FILE_HOVER:
      return {
        ...state,
        hover: action.payload.filename
      }
    case FILE_UPLOAD_FULFILLED:
    case FILEQUEUE_LOAD_FULFILLED:
      let newFiles = {}
      action.payload.body.forEach((f) => {
        newFiles[f.filename] = f
        newFiles[f.filename].selected = false
      })
      return {
        ...state,
        queue: {...state.queue, ...newFiles}
      }
    default:
      return state
  }
}

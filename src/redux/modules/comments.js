import request from 'superagent-bluebird-promise'

// saving a comment
export const COM_SAVE_PENDING = 'COM_SAVE_PENDING'
export const COM_SAVE_FULFILLED = 'COM_SAVE_FULFILLED'
export const COM_SAVE_REJECTED = 'COM_SAVE_REJECTED'

// showing / hiding comments for a post
export const COM_SHOW_BYPOST = 'COM_SHOW_BYPOST'
export const COM_HIDE_BYPOST = 'COM_HIDE_BYPOST'

// loading comments for a post
export const COM_LOAD_BYPOST_PENDING = 'COM_LOAD_BYPOST_PENDING'
export const COM_LOAD_BYPOST_FULFILLED = 'COM_LOAD_BYPOST_FULFILLED'
export const COM_LOAD_BYPOST_REJECTED = 'COM_LOAD_BYPOST_REJECTED'

// loading recents comments
export const COM_LOAD_RECENTS_PENDING = 'COM_LOAD_RECENTS_PENDING'
export const COM_LOAD_RECENTS_FULFILLED = 'COM_LOAD_RECENTS_FULFILLED'
export const COM_LOAD_RECENTS_REJECTED = 'COM_LOAD_RECENTS_REJECTED'

const initialState = {
  recents: [],
  byId: {},
  statusForPost: {},
  shownForPost: {}
}

export const showForPost = function (slug) {
  return {
    type: COM_SHOW_BYPOST,
    payload: {
      slug
    }
  }
}

export const hideForPost = function (slug) {
  return {
    type: COM_HIDE_BYPOST,
    payload: {
      slug
    }
  }
}

export const loadForPost = function (postId, slug) {
  return {
    type: 'COM_LOAD_BYPOST',
    meta: {
      postId,
      slug
    },
    payload: {
      promise: request(`/api/comments/post/${postId}`).promise()
    }
  }
}

export const save = function (comment, slug) {
  return {
    type: 'COM_SAVE',
    meta: {
      postId: comment.post,
      slug
    },
    payload: {
      promise: request.post('/api/comments').send(comment).promise()
    }
  }
}

export const actions = {
  save,
  loadForPost,
  hideForPost,
  showForPost
}

export default function comments (state = initialState, action) {
  switch (action.type) {
    case COM_SHOW_BYPOST:
      return {
        ...state,
        shownForPost: {
          ...state.shownForPost,
          [action.payload.slug]: true
        }
      }

    case COM_HIDE_BYPOST:
      return {
        ...state,
        shownForPost: {
          ...state.shownForPost,
          [action.payload.slug]: false
        }
      }

    case COM_SAVE_PENDING:
      return {
        ...state,
        statusForPost: {
          ...state.statusForPost,
          [action.meta.slug]: 'SAVING'
        }
      }

    case COM_SAVE_FULFILLED:
      let com = action.payload.body
      return {
        ...state,
        statusForPost: {
          ...state.statusForPost,
          [action.meta.slug]: 'LOADED'
        },
        byId: {
          ...state.byId,
          [com._id]: com
        },
        recents: [...state.recents, com]
      }

    case COM_LOAD_BYPOST_FULFILLED:
      let loadedComs = {}
      action.payload.body.forEach((com) => {
        loadedComs[com._id] = com
      })
      return {
        ...state,
        statusForPost: {
          ...state.statusForPost,
          [action.meta.slug]: 'LOADED'
        },
        byId: {
          ...state.byId,
          ...loadedComs
        }
      }

    default:
      return state
  }
}

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
  shownForPost: [],
  saving: false
}

export const showCommentsForPost = function (postId) {
  return {
    type: COM_SHOW_BYPOST,
    payload: {
      postId: postId
    }
  }
}

export const hideCommentsForPost = function (postId) {
  return {
    type: COM_HIDE_BYPOST,
    payload: {
      postId: postId
    }
  }
}

export const getCommentsForPost = function (postId) {
  return {
    type: 'COM_LOAD_BYPOST',
    meta: {
      postId: postId
    },
    payload: {
      promise: request(`/api/comments/post/${postId}`).promise()
    }
  }
}

export const saveComment = function (comment) {
  return {
    types: 'COM_SAVE',
    payload: {
      promise: request.post('/api/comments').send(comment).promise()
    }
  }
}

export default function comments (state = initialState, action) {
  switch (action.type) {
    case COM_SHOW_BYPOST:
      state.shownForPost = [...state.shownForPost, action.payload.postId]
      return state

    case COM_HIDE_BYPOST:
      state.shownForPost = state.shownForPost.filter((p) => p !== action.payload.postId)
      return state

    case COM_SAVE_PENDING:
      return {...state, saving: true}

    case COM_SAVE_FULFILLED:
      let com = action.payload.body
      let postId = com.post
      return {
        saving: false,
        shownForPost: state.shownForPost,
        byPost: {
          ...state.byPost,
          [postId]: [...state.byPost[postId], com]
        },
        recents: [...state.recents, com]
      }

    case COM_LOAD_BYPOST_FULFILLED:      // parses our header "posts 30-40/2000"
      return {...state,
          byPost: {...state.byPost,
            [action.meta.postId]: action.payload.body}
      }

    default:
      return state
  }
}

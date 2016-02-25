/* @flow */

import request from 'superagent-bluebird-promise'

// ------------------------------------
// Constants
// ------------------------------------
// loading a page of posts
export const POST_LOAD_PAGE_PENDING = 'POST_LOAD_PAGE_PENDING'
export const POST_LOAD_PAGE_FULFILLED = 'POST_LOAD_PAGE_FULFILLED'
export const POST_LOAD_PAGE_REJECTED = 'POST_LOAD_PAGE_REJECTED'

// loading a single post
export const POST_LOAD_BYID_PENDING = 'POST_LOAD_BYID_PENDING'
export const POST_LOAD_BYID_FULFILLED = 'POST_LOAD_BYID_FULFILLED'
export const POST_LOAD_BYID_REJECTED = 'POST_LOAD_BYID_REJECTED'

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

// ------------------------------------
// Actions
// ------------------------------------
// NOTE: "Action" is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// If you're unfamiliar with Flow, you are completely welcome to avoid annotating your code, but
// if you'd like to learn more you can check out: flowtype.org.
export const postLoadPage = (page: number, nbPerPage: number): Action => {
  let range = [(page - 1) * nbPerPage, page * nbPerPage]
  return {
    types: [
      POST_LOAD_PAGE_PENDING,
      POST_LOAD_PAGE_FULFILLED,
      POST_LOAD_PAGE_REJECTED
    ],
    meta: {page, nbPerPage},
    payload: {
      promise: request('/api/posts').set('range', range.join('-')).promise()
    }
  }
}

export const postLoadById = (id: number): Action => {
  return {
    types: [
      POST_LOAD_BYID_PENDING,
      POST_LOAD_BYID_FULFILLED,
      POST_LOAD_BYID_REJECTED
    ],
    payload: {
      promise: request(`/api/post/${id}`).promise()
    }
  }
}

export const actions = {
  postLoadPage,
  postLoadById
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  count: 0,
  nbPages: 0,
  byId: {},
  byPage: {},
  pending: false
}

export default function posts (state = initialState, action) {
  switch (action.type) {
    case COM_SAVE_FULFILLED:
      let com = action.payload.body
      let postId = com.post
      state.byId[postId].comments.push(com._id)
      return {...state}

    case POST_LOAD_PAGE_PENDING:
      return {...state, pending: true}

    case POST_LOAD_PAGE_FULFILLED:      // parses our header "posts 30-40/2000"
      let [, count] = action.payload.headers['content-range'].replace('posts ', '').split('/')
      let nbPerPage = action.meta.nbPerPage
      let newPostsById = {}
      let byPage = []
      action.payload.body.forEach((post) => {
        newPostsById[post._id] = post
        byPage.push(post._id)
      })
      return {
        count: parseInt(count),
        pending: false,
        nbPages: parseInt(count / nbPerPage),
        byId: {...state.byId, ...newPostsById},
        byPage: {...state.byPage, [action.meta.page]: byPage}
      }

    case POST_LOAD_BYID_FULFILLED:
      let post = action.payload.body
      state.byId[post._id] = post
      return {...state, byId: {...state.byId}}
    default:
      return state
  }
}

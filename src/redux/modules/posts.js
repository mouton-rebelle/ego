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
export const POST_LOAD_BYSLUG_PENDING = 'POST_LOAD_BYSLUG_PENDING'
export const POST_LOAD_BYSLUG_FULFILLED = 'POST_LOAD_BYSLUG_FULFILLED'
export const POST_LOAD_BYSLUG_REJECTED = 'POST_LOAD_BYSLUG_REJECTED'

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

export const ADD_IMAGE_TO_POST = 'ADD_IMAGE_TO_POST'

export const TOGGLE_MESH_DIRECTION = 'TOGGLE_MESH_DIRECTION'
// ------------------------------------
// Actions
// ------------------------------------
// NOTE: "Action" is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// If you're unfamiliar with Flow, you are completely welcome to avoid annotating your code, but
// if you'd like to learn more you can check out: flowtype.org.
export const postLoadPage = (page: number, nbPerPage: number = 10): Action => {
  let range = [(page - 1) * nbPerPage, page * nbPerPage]
  return {
    type: 'POST_LOAD_PAGE',
    meta: {page, nbPerPage},
    payload: {
      promise: request('/api/posts').set('range', range.join('-')).promise()
    }
  }
}
export const addImageToPost = (image, path) => {
  return {
    type: ADD_IMAGE_TO_POST,
    payload: {image, path}
  }
}
export const toggleMeshDirection = (path) => {
  console.log('called')
  return {
    type: TOGGLE_MESH_DIRECTION,
    payload: {path}
  }
}
export const postLoadBySlug = (slug: string): Action => {
  return {
    type: 'POST_LOAD_BYSLUG',
    meta: {slug},
    payload: {
      promise: request(`/api/post/${slug}`).promise()
    }
  }
}

export const actions = {
  postLoadPage,
  postLoadBySlug,
  addImageToPost,
  toggleMeshDirection
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  count: 0,
  nbPages: 0,
  newPost: {
    title: 'my new post',
    _id: 0,
    horizontal: true,
    child: []
  },
  bySlug: {},
  byPage: {},
  loadingPages: [],
  loadedPages: []
}

export default function posts (state = initialState, action) {
  switch (action.type) {
    case ADD_IMAGE_TO_POST:
      return {
        ...state,
        newPost:
        {
          ...state.newPost,
          child: [
            ...state.newPost.child,
            {
              weight: 100,
              image: {
                ...action.payload.image,
                ratio: action.payload.image.width / action.payload.image.height
              }
            }
          ]
        }
      }
    case TOGGLE_MESH_DIRECTION:
      return {
        ...state,
        newPost:
        {
          ...state.newPost,
          horizontal: !state.newPost.horizontal
        }
      }
    case COM_SAVE_FULFILLED:
      let com = action.payload.body
      state.bySlug[action.meta.slug].comments.push(com._id)
      return {...state}

    case POST_LOAD_PAGE_PENDING:
      return {...state, loadingPages: [...state.loadingPages, action.meta.page]}

    case POST_LOAD_PAGE_FULFILLED:      // parses our header "posts 30-40/2000"
      let [, count] = action.payload.headers['content-range'].replace('posts ', '').split('/')
      let nbPerPage = action.meta.nbPerPage
      let newPostsBySlug = {}
      let byPage = []
      action.payload.body.forEach((post) => {
        newPostsBySlug[post.slug] = post
        byPage.push(post.slug)
      })
      return {
        count: parseInt(count),
        loadedPages: [...state.loadedPages, action.meta.page],
        loadingPages: state.loadingPages.filter((p) => p!==action.meta.page),
        nbPages: parseInt(count / nbPerPage),
        bySlug: {...state.bySlug, ...newPostsBySlug},
        byPage: {...state.byPage, [action.meta.page]: byPage}
      }

    case POST_LOAD_BYSLUG_FULFILLED:
      let post = action.payload.body
      state.bySlug[post.slug] = post
      return {...state, bySlug: {...state.bySlug}}
    default:
      return state
  }
}

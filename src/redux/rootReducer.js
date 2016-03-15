import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import comments from './modules/comments'
import posts from './modules/posts'
import files from './modules/files'

export default combineReducers({
  posts,
  comments,
  files,
  router
})

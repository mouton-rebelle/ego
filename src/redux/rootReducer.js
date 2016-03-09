import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import comments from './modules/comments'
import posts from './modules/posts'

export default combineReducers({
  posts,
  comments,
  router
})

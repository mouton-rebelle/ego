import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import posts from './modules/posts'

export default combineReducers({
  counter,
  posts,
  router
})

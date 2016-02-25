import Router from 'koa-router'
import * as commentsApi from './comments'
import * as postsApi from './posts'
import * as _ from 'lodash'

let router = new Router()

router.get('/api/comments/post/:id', function *(next) {
  this.type = 'application/json'
  let comments = yield commentsApi.getByPostId(this.params.id)
  this.body = JSON.stringify(comments)
})

router.get('/api/post/:id', function *(next) {
  this.type = 'application/json'
  let post = yield postsApi.getById(this.params.id)
  this.body = JSON.stringify(post)
})

router.post('/api/comments', function *(next) {
  this.type = 'application/json'
  let comment = yield commentsApi.save(this.request.body)
  this.body = JSON.stringify(comment)
})

router.get('/api/posts', function *(next) {
  let range = _.get(this.request.headers, 'range', '0-10')
  let [ start = 0, end = 10 ] = range.split('-')
  let { posts, contentRange, partial } = yield postsApi.getByRange(start, end)
  this.type = 'application/json'
  this.status = partial ? 206 : 200
  this.set('Content-Range', contentRange)
  this.set('Accept-Ranges', 'posts')
  this.set('Range-Unit', 'posts')
  this.body = JSON.stringify(posts)
})

export default router
